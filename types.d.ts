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

interface IState {
  products: IProduct[];
  size: string;
  sort:string;
}