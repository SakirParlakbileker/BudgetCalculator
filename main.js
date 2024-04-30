const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFileter = document.querySelector("#filter-select");
const nameInput = document.querySelector("#name-input");

// tarayıcadan ismi alma
const username = localStorage.getItem("name") || "";

nameInput.value = username;

// kullınıcın girdiği ismi tarayıca depolamasında saklama
nameInput.addEventListener("change", (e) => {
  localStorage.setItem("name", e.target.value);
});

// izleme işlemleri
formBtn.addEventListener("click", addExpense);
liste.addEventListener("click", handleClick);
selectFileter.addEventListener("change", handleFilter);

// Toplam statei(durum)
let toplam = 0;

function updateToplam(fiyat) {
  //2.ci yöntem = toplam += parseInt(fiyat);
  toplam += Number(fiyat);
  toplamBilgi.innerText = toplam;
}

// harcama oluşturma
function addExpense(e) {
  e.preventDefault();

  // doğrulama yapma
  if (!fiyatInput.value || !harcamaInput.value) {
    alert("Empty input/entry");
    // fonksiyonu durduruyoruz
    return;
  }

  //   div oluşturma
  const harcamaDiv = document.createElement("div");

  //   class ekleme
  harcamaDiv.classList.add("harcama");
  // eğer checkbox tiklendiyse bir class daha ekledi
  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  }

  //   içeriğini ayarlama
  harcamaDiv.innerHTML = `
  <h2>${harcamaInput.value}</h2>
  <h2 id="value" >${fiyatInput.value}</h2>
  <div class="buttons">
  <img id="payment" src="/images/pay.png" />
  <img id="remove" src="/images/remove.png" />
  </div>`;

  //   oluşan harcamayı html'e gönderme (listeye ekleme)
  liste.appendChild(harcamaDiv);

  // toplamı güncelle
  updateToplam(fiyatInput.value);

  //   formu temizleme
  harcamaInput.value = "";
  fiyatInput.value = "";
}

// Liste tıklanma olayını yönetme
function handleClick(e) {
  const element = e.target;

  if (element.id === "remove") {
    // Tıklanılan sil butonunun kapsayıcısını alma
    const wrapperElement = element.parentElement.parentElement;

    // Silinen elemanın fiyatını alma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;
    Number(deletedPrice.innerText);

    // Silinenin fiyatını toplamdan çıkarma
    updateToplam(-Number(deletedPrice));

    // Kapsayıcıyı html'den kaldırma
    wrapperElement.remove();
  }
}

// filtreleme işlemi
function handleFilter(e) {
  const items = liste.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }

        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
