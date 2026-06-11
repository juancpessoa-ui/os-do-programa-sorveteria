(function () {
  //pega o id da url
  const id = new URLSearchParams(location.search).get("id");
  const produto = window.getProduct(id);
  const root = document.getElementById("pd-root");

  console.log(produto)

  if (!produto) {
    root.innerHTML = `<div class="container"><h1>Produto não encontrado</h1><p class="muted">Volte ao <a href="../../index.html" style="color:var(--primary)">catálogo</a>.</p></div>`;
    return;
  }
  document.title = `${produto.name} — Sorvetudos`;

  //pega 4 produtos diferentes do produto atual
  const related = window.PRODUCTS.filter(x => x.id !== produto.id).slice(0, 4);

  root.innerHTML = `
    <div class="container">
      <a href="../../index.html" class="back">← Voltar</a>
      <div class="pd-grid">
        <div class="pd-img surgir">
          <img src="${'..' + produto.image}" alt="${escapeHtml(produto.name)}">
        </div>
        <div class="pd-info surgir" style="animation-delay:100ms">
          <span class="cat">${escapeHtml(produto.category)}</span>
          <h1>${escapeHtml(produto.name)}</h1>
          <p class="flavor">${escapeHtml(produto.flavor)}</p>
          <p class="desc">${escapeHtml(produto.description)}</p>
          <h3 class="ing-l">Ingredientes</h3>
          <div class="pd-ings">${produto.ingredients.map(i => `<span>${escapeHtml(i)}</span>`).join("")}</div>
          <div class="pd-price"><div class="l">A partir de</div><div class="v">${formatarPreco(produto.price)}</div></div>
        </div>
      </div>
      <section class="related">
        <h2 class="serif">Você também vai amar</h2>
        <div class="grid-2">
          ${related.map((r, i) => `
            <a href="product.html?id=${r.id}" class="product-card" style="animation-delay:${i*50}ms">
              <div class="product-img"><img src="${'..' + r.image}" alt="${escapeHtml(r.name)}" loading="lazy">${r.tag ? `<span class="product-tag">${escapeHtml(r.tag)}</span>`:""}</div>
              <div class="product-info">
                <div class="meta"><span>${escapeHtml(r.category)}</span></div>
                <h3>${escapeHtml(r.name)}</h3>
                <p>${escapeHtml(r.flavor)}</p>
              </div>
              <div class="product-price"><span>${formatarPreco(r.price)}</span></div>
              <div class="product-price-mobile">${formatarPreco(r.price)}</div>
            </a>`).join("")}
        </div>
      </section>
    </div>`;
})();
