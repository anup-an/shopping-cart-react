interface IProps{
    products?: IProduct[];
    size?: string;
    sort?: string;
}

interface IProduct {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  availableSizes: string[];
}

interface ICart {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  availableSizes: string[];
  quantity: number;
}

interface IState {
  products: IProduct[];
  size: string;
  sort:string;
}
