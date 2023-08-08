import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/Prodcuts';

@Pipe({
  name: 'filter'
})
export class PipePipe implements PipeTransform {

  transform(products: Product[], term: string): Product[] {
    if (!products || !term) {
      return products;
    }
    term = term.toLowerCase();
    return products.filter((product: Product) =>
      product.productName.toLowerCase().includes(term));
  }

}
