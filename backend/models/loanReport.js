module.exports = (Loan) => {
  const today = new Date()
  console.log(Loan)
  return `
      
      <!doctype html>
      <html lang="en">
  
      <head>
  
      <meta charset="utf-8">
      <title></title>
      <style>
      
      .clearfix:after {
          content: "";
          display: table;
          clear: both;
        }
        
        a {
          color: #5D6975;
          text-decoration: underline;
        }
        
        body {
          position: relative;
          width: 15cm;  
          height: 20cm; 
          margin: 0 auto; 
          color: #001028;
          background: #FFFFFF; 
          font-family: Arial, sans-serif; 
          font-size: 8px; 
          font-family: Arial;
        }
        
        header {
          padding: 10px 0;
          margin-bottom: 30px;
        }
        
        #logo {
          text-align: center;
          margin-bottom: 10px;
        }
        
        #logo img {
          width: 400px;
        }
        
        h1 {
          border-top: 1px solid  #5D6975;
          border-bottom: 1px solid  #5D6975;
          color: #5D6975;
          font-size: 2.4em;
          line-height: 1.4em;
          font-weight: normal;
          text-align: center;
          margin: 0 0 20px 0;
          background: url(dimension.png);
        }
        
        #project {
          float: left;
        }
        
        #project span {
          color: #5D6975;
          text-align: right;
          width: 52px;
          margin-right: 10px;
          display: inline-block;
          font-size: 0.8em;
        }
        
        #company {
          float: right;
          text-align: right;
        }
        
        #project div,
        #company div {
          white-space: nowrap;        
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          margin-bottom: 20px;
        }
        
        table tr:nth-child(2n-1) td {
          background: #F5F5F5;
        }
        
        table th,
        table td {
          text-align: center;
        }
        
        table th {
          padding: 5px 20px;
          color: #5D6975;
          border-bottom: 1px solid #C1CED9;
          white-space: nowrap;        
          font-weight: normal;
        }
        
        table .service,
        table .desc {
          text-align: left;
        }
        
        table td {
          padding: 20px;
          text-align: right;
        }
        
        table td.service,
        table td.desc {
          vertical-align: top;
        }
        
        table td.unit,
        table td.qty,
        table td.total {
          font-size: 0.6em;
        }
        
        table td.grand {
          border-top: 1px solid #5D6975;;
        }
        
        #notices .notice {
          color: #5D6975;
          font-size: 0.6em;
        }
        
        footer {
          color: #5D6975;
          width: 100%;
          height: 30px;
          position: absolute;
          bottom: 0;
          border-top: 1px solid #C1CED9;
          padding: 8px 0;
          text-align: center;
        }
      
      </style>
  
      </head>
  
      <body>
  
      <header class="clearfix">
      <div id="logo">
        <img src="http://localhost:3500/logo.png" height="100px">
      </div>
      <!-- <h1><b>PayrollX</b></h1> -->
      <h1>Loan Details</h1>
  
      <div id="company" class="clearfix">
        <div>Cyber Concepts Sri Lanka - Software Solutions Company</div>
        <div>16 Atapattu Mawatha<br /> Dehiwala-Mount Lavinia 10350, Srilanka</div>
        <div>04122#####</div>
        <div><a href="#">rashixd@gmail.com</a></div>
      </div>
      <div id="project">
        <div><span>Position</span>Acountant</div>
        <div><span>Name</span>Rashi Amarasiri</div>
       
        <div><span>EMAIL</span> <a href="#">rxd@payrollx.com</a></div>
        <div><span>DATE</span>${`${today}`}</div>
       
      </div>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee name</th>
            <th>Loan ID</th>
            <th>Loan Type</th>
            <th>Reason</th>
            <th>Interest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="desc">${Loan.empid}</td>
            <td class="desc">${Loan.fullname}</td>
            <td class="desc">${Loan.loanid}</td>
            <td class="desc">${Loan.loantype}</td>
            <td class="desc">${Loan.reason}</td>
            <td class="desc">${Loan.interest}</td>
          </tr> 
        </tbody>
      </table>
      <div id="notices"> 
      </div>
    </main>
    <footer>
    </footer>
      </body>
      </html>
      `
}