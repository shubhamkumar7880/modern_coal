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
const other_El = document.getElementById("oc");

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
let total;
other_El.addEventListener("input", (e) => {
  const other_charge = +e.target.value;
  total = total + other_charge;
  console.log(total);
  const tot = total.toFixed(2);
  total_El.innerHTML = `<input type="text" id="vof" value=${tot} name='Total' />`;
  const dec = withDecimal(tot);
  words.innerHTML = `<textarea name="Delivery-address" id="dec" cols="5" rows="5">${dec}</textarea>`;
});
rate.addEventListener("input", (e) => {
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
    const dec = withDecimal(tot);
    words.innerHTML = `<textarea name="Delivery-address" id="dec" cols="5" rows="5">${dec}</textarea>`;
  } else {
    const sgs = sgst.toFixed(2);
    sgst_El.innerHTML = `<input type="text" id="vof" value=${sgs} name='SGST' />`;

    const cgs = sgst.toFixed(2);
    cgst_El.innerHTML = `<input type="text" id="vof" value=${cgs} name='CGST' />`;

    total = put * rt + 2 * sgs;

    const tot = total.toFixed(2);
    total_El.innerHTML = `<input type="text" id="vof" value=${tot} name='Total' />`;
    const dec = withDecimal(tot);
    words.innerHTML = `<textarea name="Delivery-address" id="dec" cols="5" rows="5">${dec}</textarea>`;
  }
  if (hsn === 27011990) {
    let val = sel.value;
    let cess;
    if (val === "Tailings") {
      cess = 0;
    } else {
      cess = put * 400;

      const ces = cess.toFixed(2);
      cess_El.innerHTML = `<input type="text" id="vof" value=${ces} name='CESS' />`;
      total = put * rt + 2 * sgst + cess;

      const tot = total.toFixed(2);
      total_El.innerHTML = `<input type="text" id="vof" value=${tot} name='Total' />`;
      const dec = withDecimal(tot);
      words.innerHTML = `<textarea name="Delivery-address" id="dec" cols="5" rows="5">${dec}</textarea>`;
    }
  }
});

function convertNumberToWords(amount) {
  var words = new Array();
  words[0] = "";
  words[1] = "One";
  words[2] = "Two";
  words[3] = "Three";
  words[4] = "Four";
  words[5] = "Five";
  words[6] = "Six";
  words[7] = "Seven";
  words[8] = "Eight";
  words[9] = "Nine";
  words[10] = "Ten";
  words[11] = "Eleven";
  words[12] = "Twelve";
  words[13] = "Thirteen";
  words[14] = "Fourteen";
  words[15] = "Fifteen";
  words[16] = "Sixteen";
  words[17] = "Seventeen";
  words[18] = "Eighteen";
  words[19] = "Nineteen";
  words[20] = "Twenty";
  words[30] = "Thirty";
  words[40] = "Forty";
  words[50] = "Fifty";
  words[60] = "Sixty";
  words[70] = "Seventy";
  words[80] = "Eighty";
  words[90] = "Ninety";
  amount = amount.toString();
  var atemp = amount.split(".");
  var number = atemp[0].split(",").join("");
  var n_length = number.length;
  var words_string = "";
  if (n_length <= 9) {
    var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    var received_n_array = new Array();
    for (var i = 0; i < n_length; i++) {
      received_n_array[i] = number.substr(i, 1);
    }
    for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
      n_array[i] = received_n_array[j];
    }
    for (var i = 0, j = 1; i < 9; i++, j++) {
      if (i == 0 || i == 2 || i == 4 || i == 7) {
        if (n_array[i] == 1) {
          n_array[j] = 10 + parseInt(n_array[j]);
          n_array[i] = 0;
        }
      }
    }
    value = "";
    for (var i = 0; i < 9; i++) {
      if (i == 0 || i == 2 || i == 4 || i == 7) {
        value = n_array[i] * 10;
      } else {
        value = n_array[i];
      }
      if (value != 0) {
        words_string += words[value] + " ";
      }
      if (
        (i == 1 && value != 0) ||
        (i == 0 && value != 0 && n_array[i + 1] == 0)
      ) {
        words_string += "Crores ";
      }
      if (
        (i == 3 && value != 0) ||
        (i == 2 && value != 0 && n_array[i + 1] == 0)
      ) {
        words_string += "Lakhs ";
      }
      if (
        (i == 5 && value != 0) ||
        (i == 4 && value != 0 && n_array[i + 1] == 0)
      ) {
        words_string += "Thousand ";
      }
      if (i == 6 && value != 0 && n_array[i + 1] != 0 && n_array[i + 2] != 0) {
        words_string += "Hundred and ";
      } else if (i == 6 && value != 0) {
        words_string += "Hundred ";
      }
    }
    words_string = words_string.split("  ").join(" ");
  }
  return words_string;
}

function withDecimal(n) {
  var nums = n.toString().split(".");
  var whole = convertNumberToWords(nums[0]);
  if (nums.length == 2) {
    var fraction = convertNumberToWords(nums[1]);
    return whole + "and " + fraction + "paise only.";
  } else {
    return whole;
  }
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
    let val = sel.value;

    if (val === "Others") {
      desc.innerHTML = `<textarea name="Description" id="" cols="30" rows="10"></textarea>`;
    }
  });
});

async function getd_add(num) {
  const res = await fetch(
    `https://sheet.gstincheck.co.in/check/046af4e9a536deed966f4a68f62cab3b/${num}`
  );
  const data = await res.json();

  const add = data.data.pradr.adr;

  d_add.innerHTML = `<textarea name="Delivery-address" id="del" cols="5" rows="5">${add}</textarea>`;
}

async function getGST(num) {
  const res = await fetch(
    `https://sheet.gstincheck.co.in/check/046af4e9a536deed966f4a68f62cab3b/${num}`
  );

  const data = await res.json();
  // console.log(data);
  address_El.innerHTML = `<textarea name="address_EL" id="ad_del" cols="5" rows="5">${data.data.pradr.adr}</textarea>`;

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
