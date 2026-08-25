import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">

      <Link to={`/product/${product.id}`} className="product-image">
        <img src={product.image} alt={product.name} />

        <span className="product-view">
          <ArrowUpRight size={17} />
        </span>
      </Link>

      <div className="product-info">

        <div>
          <h3>{product.name}</h3>
          <p>{product.notes}</p>
        </div>

        <strong>${product.price}</strong>

      </div>

      <Link
        to={`/product/${product.id}`}
        className="product-link"
      >
        SHOP NOW <span>→</span>
      </Link>

    </article>
  );
}
