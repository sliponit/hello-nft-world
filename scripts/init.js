const shuffle = [
  33, 37,  8, 31, 13, 24, 28,  9, 36,  2,
   3, 21, 15, 34, 26, 32, 25, 17, 39,  7,
  29,  4, 12, 14, 19, 18,  6,  5, 10, 38,
  22, 16, 27,  1, 23, 30, 35, 11, 20,  0
]

const cids = [
  'Qmbj9Q9B5b8cFzwHLTF9VHfqbXpXRhpAPrimT1WKMvDYzk',
  'QmaV4MSzd1g99bHGQgp5xYXJQQe4s4BGsr7tXfKZP9QMCK',
  'QmUQALrtarARNrsELBTUg2NRCTdJnHVbEAjp258FkqyimK',
  'QmdTQySxTqPwPbcKP6S9emj9ZE9a9FpEuMGBotA1XYJJJx',
  'QmQTyGaVZDcV7E3Gun9TvheHthCu26Nv7qU1ZnnUz7akWt',
  'QmVJhLpgHc9yCvGNwWTVNTLmUjgqK9SxBND95tS7bwAVRM',
  'QmTsWyNQPM4kkAJcfhoAwr254EG9QmxbCPE37k33M2tbim',
  'Qmd1kBsKrpLpKrZtbfKpwbn7yEvg4oYHMUipiD89Jokppi',
  'Qmd3vUDXV5hxgEAKBX7RkmmVxqZssznamUxJwWr9siycGX',
  'QmaWEp3LTjwDg693Fnm8c4inQ1Udr9iBRFLxZPzawRVGY8',
  'QmbbSnnLZrT3Pag6AjoKD1nhh6e19svMcNXEAsi9MFboRh',
  'QmXGTTVoaN3MC6CswHQFvLaoW1Y2e1hRPVKnicxGCtv6T8',
  'QmYAZpkiBp95U1oGPtFFQwkKSzyuSdUjdu9yeLAmecLbRg',
  'QmcEDg8st2S35WRchtg6dwDYJfSw4MTvvN1y5HbCnqnY8n',
  'QmQdgFJZ8UweAWRpkSKUZ6SK3Cqx2mLvcdpLsY5DFRYQ9g',
  'QmNMas5ABsyFQyoWXz1nhfpgL3bgm7nu2PsXHKscMjKsUh',
  'QmU3SVUXkGr9zeUHvpvbq7jumLc5QHbRpbwiT3XpBanCSJ',
  'QmP16vQnaKMC3TScaXfQWSpk2iYJrCG6JkngSh5VRapyte',
  'QmefZQjW9AysncsvyVD8euj17Pu8tYnKi6Z4xnBhXkwtTa',
  'QmXd5K22YxszUiTyx42XR4sqDDawMuTBDCny52dfAadnh8',
  'Qma6KiGFLsXZMZnQn3RCscdEkNsjEkc4HLfpAyQXN7KwTQ',
  'QmXxss35L36KvLq99G3CfeLzedDYE7PZEpA4sNWUDJan96',
  'QmS9PGdtV5fMtvVjRaTu9mgsTfdQBhcWJkSpdX2ShiqksW',
  'QmdmRzaw13RFURJ6KXJW1iGHLkioNs4KuA3jsas18YcJYu',
  'QmbjeVjXa5a69aWLiK2kAJYWMDuoUyspGr1Ryw5bjvJ2fj',
  'QmbHaUpr6jzFyrTJbnVwCrTYNP4ahs2JMfJfcxt2RgYt62',
  'QmcJ5vqiZmjf5frnwgoFkkfZYS15NoHgDhg9iWXohEgoo3',
  'QmYTfLLkHjAs7tDi9cnPGZeJoDMJKLDmBYemMaM3T4yyPd',
  'QmRtaWYrvWk4PhivaWH5npLXDngA93dBS3jDg3dPV2PgGQ',
  'QmWGiZmpi4PKQKqjJ9rQMw7KwEUdyFST4RxhDqbnzyrEaV',
  'QmUbBDenEsmE5d3jRzBKwAGAB33ULQoeEtA28mv5Xvr8ZJ',
  'QmZXqoRg5LQALCsWFSCyD39dTQyGF2XU1hWGzviJ5XPcBk',
  'Qme8hmN7AiHqmbcgsvRucEYJCeKAm386xKemdRbKuTyuzr',
  'QmQMngvPoqfhKfBsvkUH84dvJPBdZFfqSXTcYehNAwuRDY',
  'QmcCjS94TJJJPn5enA7SHqfR3vGeKCwHAnu72BFmt22WFp',
  'QmeMFxB1yuLTTEcggDxvSRFfPRRN78yzXwdydfoU6nEcu9',
  'QmfBWaLk7A3fCC7K2DkAeL2X3dTXBVmNMcTtDnbwBBGK1J',
  'QmVcpMt9NNYJbiLdCoc6kBpXtVhsZ2Ws8ACowmj5RT8ri5',
  'QmUc4BVWMsNiAZVz94C2RPeSaVqXt7MCQJjMS3CYbpYZdK',
  'QmbckD7wwBjBogh8hn5JBRuYfs7G5MqdRejvwpUNXuyYgp'
]

const data = Array.from(Array(40).keys()).map((i) => ({
  duration: shuffle[i] + 9, cid: cids[i]
}))

console.log(JSON.stringify(data))