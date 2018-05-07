export interface Ierg {
  datum: string;
  price: number;
}

/**
 * Interface für die Rückgabe des Wechselkurses
 */
export interface Iergebnis {
  datum: string;
  exchange_rate: number;
}

export interface Iall {
  USD: Iergebnis,
  EXTR: Ierg
}
