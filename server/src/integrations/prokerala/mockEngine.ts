import { CustomerDetails, ProkeralaKundliResponse, ProkeralaMatchingResponse } from '../../types/report';

export function getMockProkeralaKundli(customer: CustomerDetails): ProkeralaKundliResponse {
  const nameHash = customer.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rashiIndex = nameHash % 12;
  const nakshatraIndex = nameHash % 27;

  const rashis = [
    'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)',
    'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrischika (Scorpio)',
    'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
  ];

  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
    'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  const lords = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

  return {
    nakshatraDetails: {
      nakshatra: nakshatras[nakshatraIndex],
      nakshatraLord: lords[nakshatraIndex % 9],
      charna: (nameHash % 4) + 1,
      rashi: rashis[rashiIndex],
      rashiLord: lords[rashiIndex % 9],
      gan: nameHash % 2 === 0 ? 'Deva' : 'Manushya',
      yoni: 'Gaja (Elephant)',
      nadi: 'Madhya'
    },
    mangalDosha: {
      hasDosha: nameHash % 3 === 0,
      description: nameHash % 3 === 0 
        ? 'Mild Manglik Dosha observed in 1st house. Calibrated mitigations recommended.' 
        : 'No significant Manglik Dosha detected in natal chart.'
    },
    kaalSarpDosha: {
      hasDosha: nameHash % 5 === 0,
      type: nameHash % 5 === 0 ? 'Anant Kaal Sarp' : undefined,
      description: nameHash % 5 === 0 
        ? 'Hemmed planets between Rahu-Ketu axis. Focused remedies provide strong prosperity.' 
        : 'Kaal Sarp Dosha is absent.'
    },
    planetaryPositions: [
      { id: 0, name: 'Sun (Surya)', longitude: (nameHash * 13) % 360, isRetrograde: false, position: 1, degree: 14.25, rashi: rashis[rashiIndex], rashiLord: lords[rashiIndex % 9], nakshatra: nakshatras[nakshatraIndex], nakshatraLord: lords[nakshatraIndex % 9], nakshatraPada: 2 },
      { id: 1, name: 'Moon (Chandra)', longitude: (nameHash * 27) % 360, isRetrograde: false, position: 4, degree: 22.10, rashi: rashis[(rashiIndex + 2) % 12], rashiLord: lords[(rashiIndex + 2) % 9], nakshatra: nakshatras[(nakshatraIndex + 3) % 27], nakshatraLord: lords[(nakshatraIndex + 3) % 9], nakshatraPada: 1 },
      { id: 2, name: 'Mars (Mangal)', longitude: (nameHash * 41) % 360, isRetrograde: false, position: 7, degree: 8.45, rashi: rashis[(rashiIndex + 5) % 12], rashiLord: lords[(rashiIndex + 5) % 9], nakshatra: nakshatras[(nakshatraIndex + 7) % 27], nakshatraLord: lords[(nakshatraIndex + 7) % 9], nakshatraPada: 3 },
      { id: 3, name: 'Mercury (Budh)', longitude: (nameHash * 19) % 360, isRetrograde: true, position: 2, degree: 18.50, rashi: rashis[(rashiIndex + 1) % 12], rashiLord: lords[(rashiIndex + 1) % 9], nakshatra: nakshatras[(nakshatraIndex + 1) % 27], nakshatraLord: lords[(nakshatraIndex + 1) % 9], nakshatraPada: 4 },
      { id: 4, name: 'Jupiter (Guru)', longitude: (nameHash * 53) % 360, isRetrograde: false, position: 9, degree: 5.12, rashi: rashis[(rashiIndex + 8) % 12], rashiLord: lords[(rashiIndex + 8) % 9], nakshatra: nakshatras[(nakshatraIndex + 12) % 27], nakshatraLord: lords[(nakshatraIndex + 12) % 9], nakshatraPada: 2 },
      { id: 5, name: 'Venus (Shukra)', longitude: (nameHash * 33) % 360, isRetrograde: false, position: 5, degree: 29.04, rashi: rashis[(rashiIndex + 4) % 12], rashiLord: lords[(rashiIndex + 4) % 9], nakshatra: nakshatras[(nakshatraIndex + 5) % 27], nakshatraLord: lords[(nakshatraIndex + 5) % 9], nakshatraPada: 1 },
      { id: 6, name: 'Saturn (Shani)', longitude: (nameHash * 67) % 360, isRetrograde: true, position: 10, degree: 11.38, rashi: rashis[(rashiIndex + 9) % 12], rashiLord: lords[(rashiIndex + 9) % 9], nakshatra: nakshatras[(nakshatraIndex + 18) % 27], nakshatraLord: lords[(nakshatraIndex + 18) % 9], nakshatraPada: 3 },
      { id: 7, name: 'Rahu', longitude: (nameHash * 89) % 360, isRetrograde: true, position: 11, degree: 19.55, rashi: rashis[(rashiIndex + 10) % 12], rashiLord: lords[(rashiIndex + 10) % 9], nakshatra: nakshatras[(nakshatraIndex + 21) % 27], nakshatraLord: lords[(nakshatraIndex + 21) % 9], nakshatraPada: 4 },
      { id: 8, name: 'Ketu', longitude: (nameHash * 89 + 180) % 360, isRetrograde: true, position: 5, degree: 19.55, rashi: rashis[(rashiIndex + 4) % 12], rashiLord: lords[(rashiIndex + 4) % 9], nakshatra: nakshatras[(nakshatraIndex + 8) % 27], nakshatraLord: lords[(nakshatraIndex + 8) % 9], nakshatraPada: 2 }
    ],
    dashaPeriods: [
      { currentDasha: lords[nakshatraIndex % 9], currentAntardasha: lords[(nakshatraIndex + 2) % 9], startDate: '2024-01-15', endDate: '2027-04-20' },
      { currentDasha: lords[(nakshatraIndex + 1) % 9], currentAntardasha: lords[(nakshatraIndex + 3) % 9], startDate: '2027-04-21', endDate: '2030-09-10' }
    ]
  };
}

export function getMockProkeralaMatching(boy: CustomerDetails, girl: CustomerDetails): ProkeralaMatchingResponse {
  const score = (boy.name.length * 7 + girl.name.length * 11) % 14 + 22; // 22 to 36 points
  return {
    totalPoints: 36,
    obtainedPoints: score,
    compatibilityPercentage: Math.round((score / 36) * 100),
    summary: score >= 28 
      ? 'Excellent Ashtakoota compatibility! Strong mental, emotional, and physical alignment.' 
      : 'Good matrimonial alignment. Prescribed planetary remedies enhance domestic harmony.',
    kootaDetails: [
      { name: 'Varna', maxPoints: 1, obtainedPoints: 1, description: 'Work & spiritual alignment is harmonious.' },
      { name: 'Vashya', maxPoints: 2, obtainedPoints: 2, description: 'Mutual attraction and balance.' },
      { name: 'Tara', maxPoints: 3, obtainedPoints: 2.5, description: 'Health and longevity alignment.' },
      { name: 'Yoni', maxPoints: 4, obtainedPoints: 3, description: 'Physical and intimate compatibility.' },
      { name: 'Maitri', maxPoints: 5, obtainedPoints: 4, description: 'Friendship and mental rapport.' },
      { name: 'Gana', maxPoints: 6, obtainedPoints: 6, description: 'Temperamental congruence.' },
      { name: 'Bhakoot', maxPoints: 7, obtainedPoints: 7, description: 'Financial prosperity and family growth.' },
      { name: 'Nadi', maxPoints: 8, obtainedPoints: Math.min(8, score - 20), description: 'Genetic & progeny health alignment.' }
    ]
  };
}
