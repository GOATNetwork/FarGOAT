export const categories = [
  { id: "all", label: "All Categories" },
  { id: "DAU", label: "Most Active by DAU" },
  { id: "TRX", label: "Most Bullish by TRX" },
  { id: "TVL", label: "Whales by TVL" },
  { id: "Quest", label: "Most Quest Points" },
  { id: "BTC", label: "Most BTC" },
] as const;

export const mockWalletData = [
  {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    category: "DAU",
    value: 156789,
  },
  {
    address: "0x2345678901abcdef2345678901abcdef23456789",
    category: "TRX",
    value: 245678,
  },
  {
    address: "0x3456789012abcdef3456789012abcdef34567890",
    category: "TVL",
    value: 334567,
  },
  {
    address: "0x4567890123abcdef4567890123abcdef45678901",
    category: "Quest",
    value: 423456,
  },
  {
    address: "0x5678901234abcdef5678901234abcdef56789012",
    category: "BTC",
    value: 512345,
  },
  {
    address: "0x6789012345abcdef6789012345abcdef67890123",
    category: "DAU",
    value: 145678,
  },
  {
    address: "0x7890123456abcdef7890123456abcdef78901234",
    category: "TRX",
    value: 234567,
  },
  {
    address: "0x8901234567abcdef8901234567abcdef89012345",
    category: "TVL",
    value: 323456,
  },
  {
    address: "0x9012345678abcdef9012345678abcdef90123456",
    category: "Quest",
    value: 412345,
  },
  {
    address: "0x0123456789abcdef0123456789abcdef01234567",
    category: "BTC",
    value: 501234,
  },
  {
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    category: "DAU",
    value: 134567,
  },
  {
    address: "0xbcdef1234567890abcdef1234567890abcdef123",
    category: "TRX",
    value: 223456,
  },
  {
    address: "0xcdef1234567890abcdef1234567890abcdef1234",
    category: "TVL",
    value: 312345,
  },
  {
    address: "0xdef1234567890abcdef1234567890abcdef12345",
    category: "Quest",
    value: 401234,
  },
  {
    address: "0xef1234567890abcdef1234567890abcdef123456",
    category: "BTC",
    value: 490123,
  },
].map((item, index) => ({
  ...item,
  value: Math.floor(Math.random() * 1000000) + 100000,
}));
