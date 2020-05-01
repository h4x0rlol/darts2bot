type Crypto = 'BTC' | 'ETH' | 'LTC';

type Currency = 'USD' | 'RUB';

type PaymentMethod = 'qiwi' | 'card';

interface IOrder {
  id: string;
  creatorId: number;
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  price: number;
  created: number;
  updated: number;
  crypto: Crypto;
  address: string;
  min: number;
  max: number;
  creator: string;
}

interface IExchange {
  name: string;
  price: number;
  api: string;
  getPrice (crypto: Crypto, currency: Currency): Promise<number>;
}