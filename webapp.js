function doGet(e)
{
  var ss = SpreadsheetApp.openByUrl("Spread Sheet URL")
  if (e.parameter.check == "true")
  {
    var mySheet = ss.getSheetByName("Sheet1");
    dump(e, mySheet);
    var flatSheet = ss.getSheetByName("Sheet2");
    dump(e,flatSheet);
    return ContentService.createTextOutput("Both sheets updated sucessfully, sleep in peace!");
  }
  else
  {
    var mySheet = ss.getSheetByName("Sheet1");
    dump(e, mySheet);
    return ContentService.createTextOutput("Only MySheet updated sucessfully, sleep in peace!");
  }
}

function dump(e, sheet)
{
  var date = prettyDate();
  var time = new Date().toLocaleTimeString();
  var particulars = e.parameter.particulars;
  var credit = e.parameter.credit;
  var debit = e.parameter.debit;
  var balance = getBalance(sheet);
  
  if (credit == "")
  {
    credit = 0;
    balance -= parseInt(debit);
  }
  
  if (debit == "")
  {
    debit = 0;
    balance += parseInt(credit);
  }
  
  sheet.appendRow([date, time, particulars, credit, debit, balance]);
}

function getBalance(sheet)
{
  var range = sheet.getDataRange();
  var lastRow = range.getLastRow();
  var cell = range.getCell(Math.round(lastRow), 6);
  var value = cell.getValue();
  return value;
}

function prettyDate()
{
  var dateStr = new Date();
  var dateNo = dateStr.getDate()
  var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][dateStr.getMonth()];
  return dateNo + (dateNo % 10 == 1 ? "st" : dateNo % 10 == 2 ? "nd" : dateNo % 10 == 3 ? "rd" : "th") + " " + monthName + ", " + dateStr.getYear()
}
