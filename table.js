const input = document.getElementById("input");
const rate = document.getElementById("rate");
const vofgoods = document.getElementById("vofgoods");
const amount = document.getElementById("amount");
const sgst_El = document.getElementById("sgst");
const cgst_El = document.getElementById("cgst");
const igst_El = document.getElementById("igst");
const total_El = document.getElementById("total");
const number_El = document.getElementById("number");
const name_El = document.getElementById("name");
const address_El = document.getElementById("address");
const pdf_gen = document.getElementById("pdf-gen");
const gst_El = document.getElementById("gst");
const words = document.getElementById("words");
const d_add = document.getElementById("d_add");
const hsn_El = document.getElementById("hsn");
const cess_El = document.getElementById("cess_parent");
const invoice = document.getElementById("invoice");
const btn = document.getElementById("btn");
const minus_btn = document.getElementById("minus");
const desc = document.getElementById("desc");
const state_El = document.getElementById("state");
const truck_El = document.getElementById("truck");
const Eway = document.getElementById("eway");

let d = new Date();
let n = +d.getFullYear();

let y = +n.toString().substr(-2);

const yae = n + "-" + (y + 1);

let invoice_No = getData();

const inv = invoice_No + "/" + yae;

invoice.innerHTML = `<input type="text" id='invo' value=${inv} name='Invoice' />`;
if (invoice_No > 364) {
  invoice_No = 0;
}
if (invoice_No < 1) {
  invoice_No = 0;
}
btn.addEventListener("click", () => {
  let updatedinvoice_no = invoice_No + 1;

  setData(updatedinvoice_no);
});
minus_btn.addEventListener("click", () => {
  let updatedinvoice_no = invoice_No - 1;

  setData(updatedinvoice_no);
});

function setData(invoice) {
  localStorage.setItem("invoice", invoice);
  window.location.reload();
}

function getData() {
  let number = +localStorage.getItem("invoice");
  return number === null ? 0 : number;
}
getData();
let put = 0;
let rt = 0;
input.addEventListener("input", (e) => {
  put = +e.target.value;
});

rate.addEventListener("input", (e) => {
  let total;
  rt = +e.target.value;

  const vof = put * rt;
  vofgoods.innerHTML = `<input type="text" id="vof" value=${vof} name='Value' />`;

  const amo = put * rt;
  amount.innerHTML = `<input type="text" id="vof" value=${amo} name='Amount' />`;
  const sgst = put * rt * (2.5 / 100);
  sliced_number = number.slice(0, 2);
  if (sliced_number > 20 || sliced_number < 20) {
    const igs = (sgst * 2).toFixed(2);
    igst_El.innerHTML = `<input type="text" id="vof" value=${igs} name='IGST' />`;
    total = put * rt + 1 * igs;
    const tot = total.toFixed(2);

    total_El.innerHTML = `<input type="text" id="vof" value=${tot} name='Total' />`;
    words.innerHTML = inWords(total.toFixed(0));
  } else {
    const sgs = sgst.toFixed(2);
    sgst_El.innerHTML = `<input type="text" id="vof" value=${sgs} name='SGST' />`;

    const cgs = sgst.toFixed(2);
    cgst_El.innerHTML = `<input type="text" id="vof" value=${cgs} name='CGST' />`;

    total = put * rt + 2 * sgs;

    const tot = total.toFixed(2);
    total_El.innerHTML = `<input type="text" id="vof" value=${tot} name='Total' />`;
    words.innerHTML = inWords(total.toFixed(0));
  }
  if (hsn === 27011990) {
    const cess = put * 400;

    const ces = cess.toFixed(2);
    cess_El.innerHTML = `<input type="text" id="vof" value=${ces} name='CESS' />`;
    total = put * rt + 2 * sgst + cess;

    const tot = total.toFixed(2);
    total_El.innerHTML = `<input type="text" id="vof" value=${tot} name='Total' />`;
    words.innerHTML = inWords(total.toFixed(0));
  }
});

var a = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen ",
];
var b = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function inWords(num) {
  if ((num = num.toString()).length > 9) return "overflow";
  n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "only "
      : "";
  return str;
}

let number;
let sliced_number;

number_El.addEventListener("input", (e) => {
  number = e.target.value;
  sliced = number.slice(0, 2);
  state_El.innerHTML = sliced;
  getGST(number);
});

gst_El.addEventListener("input", (e) => {
  const number = e.target.value;

  getd_add(number);
});
let hsn;
hsn_El.addEventListener("input", (e) => {
  hsn = +e.target.value;
  if (hsn === 27040030) {
    desc.innerHTML = `<select name="Description" id="sel">
    <option value="Hard Coke">Hard Coke</option>
    <option value="Hard Coke_Special">Hard Coke Special</option>
    <option value="Pearl Coke">Pearl Coke</option>
    <option value="Hard Coke Rejection">Hard Coke Rejection</option>
    <option value="Coke Dust">Coke Dust</option>
    <option value="Others">Others</option>
  </select>`;
  }
  if (hsn === 27011990) {
    desc.innerHTML = `<select name="Description" id="sel">
    <option value="Coal">Coal</option>
    <option value="Wash Slurry">Wash Slurry</option>
    <option value="Tailings">Tailings</option>
    <option value="Others">Others</option>
  </select>`;
  }
  const sel = document.getElementById("sel");
  sel.addEventListener("change", () => {
    const val = sel.value;
    if (val === "Others") {
      desc.innerHTML = `<textarea name="Description" id="" cols="30" rows="10"></textarea>`;
    }
  });
});

async function getd_add(num) {
  const res = await fetch(
    `https://sheet.gstincheck.co.in/check/3f05e1a4433d7febea909920fba293ce/${num}`
  );
  const data = await res.json();

  const add = data.data.pradr.adr;

  d_add.innerHTML = `<textarea name="Delivery-address" id="del" cols="5" rows="5">${add}</textarea>`;
}

async function getGST(num) {
  const res = await fetch(
    `https://sheet.gstincheck.co.in/check/3f05e1a4433d7febea909920fba293ce/${num}`
  );

  const data = await res.json();
  // console.log(data);
  address_El.innerHTML = data.data.pradr.adr;

  const party = data.data.tradeNam;

  name_El.innerHTML = `<textarea name="Party-Name" id="part" cols="20" rows="20">${party}</textarea>`;
}

const scriptURL =
  "https://script.google.com/macros/s/AKfycbz92LWDF3MpESX2qunPaVGspigo1ehCS5Z4-o-15yUgcW3QwCRFoTQ2ULc-be38co5gWQ/exec";
const form = document.forms["google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (number_El.value.trim() === "" || gst_El.value.trim() === "") {
    alert("Please Enter the GST number");
    return;
  }
  if (truck_El.value.trim() === "") {
    alert("Please Enter the Truck number");
    return;
  }
  if (Eway.value.trim() === "") {
    alert("Please Enter the E-way bill number");
    return;
  }
  // console.log(number_El.value);
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => alert("Your data is saved in Google Spread Sheet!"))
    .catch((error) => console.error("Error!", error.message));
  document.getElementById("submit").style.display = "none";
});
