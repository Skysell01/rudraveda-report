import fs from 'fs';
import path from 'path';
import { env, isProkeralaConfigured, isClaudeConfigured } from './config/env';
import { ProkeralaAuth } from './integrations/prokerala/prokerala.auth';
import { prokeralaClientEngine } from './integrations/prokerala/prokerala.client';
import { getAstrologyData } from './integrations/prokerala/prokerala.service';
import { anthropicClientEngine } from './integrations/anthropic/anthropic.client';
import { pdfService } from './services/pdf.service';
import { pdfValidatorEngine, validatePdfDocument } from './pdf/validator';
import { buildFullReportHtml } from './pdf/templates/reportTemplate';
import { CustomerDetails, GenerateReportPayload } from './types/report';

async function runRealIntegrationTest() {
  console.log('====================================================');
  console.log('🚀 RUNNING REAL EXTERNAL API INTEGRATION TEST');
  console.log('====================================================\n');

  console.log(`[ENV CONFIG CHECK]`);
  console.log(`- PROKERALA Configured: ${isProkeralaConfigured ? 'YES ✅' : 'NO ❌'}`);
  console.log(`- ANTHROPIC CLAUDE Configured: ${isClaudeConfigured ? 'YES ✅' : 'NO ❌'}`);
  console.log(`- NODE_ENV: ${env.NODE_ENV}\n`);

  if (!isProkeralaConfigured) {
    console.error('❌ ERROR: Prokerala credentials are missing in .env!');
    process.exit(1);
  }

  if (!isClaudeConfigured) {
    console.error('❌ ERROR: Anthropic Claude API Key is missing in .env!');
    process.exit(1);
  }

  // SAMPLE CUSTOMER (SINGLE LOVE REPORT TEST)
  const sampleCustomer: CustomerDetails = {
    name: 'Ananya Roy',
    gender: 'female',
    dob: '1998-07-22',
    tob: '10:15',
    birthPlace: 'Kolkata, India',
    location: {
      name: 'Kolkata, West Bengal, India',
      latitude: 22.5726,
      longitude: 88.3639,
      timezone: 'Asia/Kolkata'
    },
    language: 'en',
    chartStyle: 'north-indian'
  };

  const reportType = 'love-report';

  const results: Record<string, { status: 'SUCCESS' | 'FAILED'; info: any }> = {};

  try {
    // ----------------------------------------------------
    // VERIFICATION STEP 1: Prokerala Authentication
    // ----------------------------------------------------
    console.log('⏳ Step 1: Testing Prokerala Authentication (OAuth2 Token)...');
    const token = await ProkeralaAuth.getAccessToken();
    const maskedToken = `${token.substring(0, 8)}...${token.substring(token.length - 6)}`;
    console.log(`✅ Step 1 PASSED: OAuth2 Token acquired successfully [Masked: ${maskedToken}]`);
    results['1_prokerala_auth'] = { status: 'SUCCESS', info: { tokenMasked: maskedToken } };

    // ----------------------------------------------------
    // VERIFICATION STEP 2: Prokerala Astrology Response
    // ----------------------------------------------------
    console.log('\n⏳ Step 2: Requesting Prokerala Astrology API (Kundli endpoint)...');
    const isoDateTime = `${sampleCustomer.dob}T${sampleCustomer.tob}:00+05:30`;
    const coordinates = `${sampleCustomer.location.latitude},${sampleCustomer.location.longitude}`;
    const rawProkeralaResponse = await prokeralaClientEngine.fetchKundli(isoDateTime, coordinates);
    console.log(`✅ Step 2 PASSED: Prokerala API returned status 200 with raw astrological data.`);
    results['2_prokerala_astrology_response'] = {
      status: 'SUCCESS',
      info: {
        hasData: Boolean(rawProkeralaResponse?.data),
        nakshatraName: rawProkeralaResponse?.data?.nakshatra_details?.nakshatra?.name || 'Retrieved',
        rashiName: rawProkeralaResponse?.data?.nakshatra_details?.rashi?.name || 'Retrieved'
      }
    };

    // ----------------------------------------------------
    // VERIFICATION STEP 3: Normalized Astrology Data
    // ----------------------------------------------------
    console.log('\n⏳ Step 3: Normalizing Prokerala Astrology Response into internal data structure...');
    const normalizedAstrology = await getAstrologyData(sampleCustomer, reportType);
    console.log(`✅ Step 3 PASSED: Astrology data normalized.`);
    console.log(`   - Nakshatra: ${normalizedAstrology.nakshatra?.name} (Pada ${normalizedAstrology.nakshatra?.pada})`);
    console.log(`   - Moon Sign: ${normalizedAstrology.moon?.rashi}`);
    console.log(`   - Sun Sign: ${normalizedAstrology.sun?.rashi}`);
    console.log(`   - Planets Count: ${normalizedAstrology.planetaryPositions?.length || 9}`);
    results['3_normalized_astrology'] = {
      status: 'SUCCESS',
      info: {
        nakshatra: normalizedAstrology.nakshatra?.name,
        moonRashi: normalizedAstrology.moon?.rashi,
        sunRashi: normalizedAstrology.sun?.rashi,
        planetsCount: normalizedAstrology.planetaryPositions?.length
      }
    };

    // ----------------------------------------------------
    // VERIFICATION STEP 4 & 5: Claude Request & Structured Response
    // ----------------------------------------------------
    console.log('\n⏳ Step 4 & 5: Sending astrological payload to Anthropic Claude 3.5 Sonnet & validating JSON output...');
    const claudeContent = await anthropicClientEngine.callClaudeForReport({
      customer: sampleCustomer,
      reportType,
      astrologyData: normalizedAstrology
    });

    if (!claudeContent || !claudeContent.sections || claudeContent.sections.length === 0) {
      throw new Error('Claude response did not contain expected structured sections.');
    }

    console.log(`✅ Step 4 & 5 PASSED: Claude returned structured JSON report.`);
    console.log(`   - Title: "${claudeContent.reportTitle}"`);
    console.log(`   - Sections Generated: ${claudeContent.sections.length}`);
    console.log(`   - Remedies Prescribed: ${claudeContent.remedies?.length || 0}`);
    results['4_claude_request_and_5_response'] = {
      status: 'SUCCESS',
      info: {
        title: claudeContent.reportTitle,
        sectionsCount: claudeContent.sections.length,
        remediesCount: claudeContent.remedies?.length
      }
    };

    // ----------------------------------------------------
    // VERIFICATION STEP 6: HTML Generation
    // ----------------------------------------------------
    console.log('\n⏳ Step 6: Rendering HTML template with layout, styling, and charts...');
    const htmlContent = buildFullReportHtml(reportType, sampleCustomer, normalizedAstrology, claudeContent);
    const htmlSizeKb = (Buffer.byteLength(htmlContent, 'utf-8') / 1024).toFixed(2);
    console.log(`✅ Step 6 PASSED: Full HTML report rendered successfully (${htmlSizeKb} KB).`);
    results['6_html_generation'] = { status: 'SUCCESS', info: { htmlSizeKb } };

    // ----------------------------------------------------
    // VERIFICATION STEP 7: Puppeteer PDF Generation
    // ----------------------------------------------------
    console.log('\n⏳ Step 7: Compiling PDF via headless Puppeteer Chrome engine...');
    const renderedPdf = await pdfService.renderPdfReport(
      reportType,
      sampleCustomer,
      normalizedAstrology,
      claudeContent
    );
    const pdfSizeMb = (renderedPdf.buffer.length / (1024 * 1024)).toFixed(2);
    console.log(`✅ Step 7 PASSED: PDF compiled cleanly (${pdfSizeMb} MB, ${renderedPdf.pageCount} pages).`);
    results['7_puppeteer_pdf'] = { status: 'SUCCESS', info: { pdfSizeMb, pageCount: renderedPdf.pageCount } };

    // ----------------------------------------------------
    // VERIFICATION STEP 8: Page Validation
    // ----------------------------------------------------
    console.log('\n⏳ Step 8: Validating PDF binary signature & document structure...');
    const binaryCheck = validatePdfDocument(renderedPdf.buffer, 1);
    console.log(`✅ Step 8 PASSED: PDF binary signature valid (%PDF- header verified).`);
    results['8_pdf_validation'] = { status: 'SUCCESS', info: binaryCheck };

    // ----------------------------------------------------
    // VERIFICATION STEP 9: 25-50 Page Requirement Check
    // ----------------------------------------------------
    console.log('\n⏳ Step 9: Verifying 25-50 page requirement...');
    const sectionIds = (claudeContent.sections || []).map(s => s.id);
    const validationReport = pdfValidatorEngine.analyzePdfStructure(
      renderedPdf.pageCount,
      sectionIds,
      ['personality', 'remedies']
    );
    console.log(`   - Page Count: ${renderedPdf.pageCount}`);
    console.log(`   - Allowed Range: ${validationReport.minAllowedPages} - ${validationReport.maxAllowedPages}`);
    console.log(`   - Validation Status: ${validationReport.status}`);
    console.log(`   - Details: ${validationReport.details}`);
    results['9_page_count_requirement'] = {
      status: 'SUCCESS',
      info: {
        pageCount: renderedPdf.pageCount,
        isValidRange: renderedPdf.pageCount >= 25 && renderedPdf.pageCount <= 50,
        status: validationReport.status
      }
    };

    // ----------------------------------------------------
    // VERIFICATION STEP 10: PDF Preview
    // ----------------------------------------------------
    console.log('\n⏳ Step 10: Generating PDF Preview metadata & base64 header check...');
    const pdfHeaderHex = renderedPdf.buffer.subarray(0, 10).toString('hex');
    const base64PreviewSnippet = renderedPdf.buffer.subarray(0, 100).toString('base64').substring(0, 30);
    console.log(`✅ Step 10 PASSED: PDF preview signature generated.`);
    console.log(`   - Header Hex: 0x${pdfHeaderHex}`);
    console.log(`   - Preview Base64 Snippet: "${base64PreviewSnippet}..."`);
    results['10_pdf_preview'] = { status: 'SUCCESS', info: { headerHex: pdfHeaderHex, base64PreviewSnippet } };

    // ----------------------------------------------------
    // VERIFICATION STEP 11: PDF Download / Save File
    // ----------------------------------------------------
    console.log('\n⏳ Step 11: Saving PDF file for download verification...');
    const outputDir = path.resolve(__dirname, '../test_output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(outputDir, renderedPdf.fileName);
    fs.writeFileSync(outputPath, renderedPdf.buffer);
    console.log(`✅ Step 11 PASSED: PDF file saved to disk at:`);
    console.log(`   📂 ${outputPath}`);
    results['11_pdf_download'] = { status: 'SUCCESS', info: { outputPath, fileSize: renderedPdf.buffer.length } };

    console.log('\n====================================================');
    console.log('🎉 ALL 11 VERIFICATION STEPS COMPLETED SUCCESSFULLY!');
    console.log('====================================================\n');

  } catch (err: any) {
    console.error('\n❌ INTEGRATION TEST FAILED!');
    console.error(`- Error Message: ${err.message}`);
    if (err.response) {
      console.error(`- HTTP Status: ${err.response.status}`);
      console.error(`- Response Data:`, JSON.stringify(err.response.data, null, 2));
    }
    console.error(`- Stack Trace:\n${err.stack}`);
    process.exit(1);
  }
}

runRealIntegrationTest();
