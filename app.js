// Listen for submit
document.getElementById('loan-form').addEventListener('submit', showLoader);

// delay result
function showLoader(e){
    //Hide results
    document.getElementById('results').style.display = 'none';

    //Show results
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults,500);

    e.preventDefault();
}

//calculate results
function calculateResults(){
    
    console.log('Calculating..');
    //UI vars
    const UIamount = document.getElementById('amount');
    const UIinterest = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value)/ 100 / 12;
    const calculatedPayments = parseFloat(UIyears.value) * 12;

    //compute
    const x = Math.pow( 1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //show results    
        document.getElementById('results').style.display = 'block';

        //hide spiner
        document.getElementById('loading').style.display = 'none';
    }else{
        //hide results    
        document.getElementById('results').style.display = 'none';

        //hide spiner
        document.getElementById('loading').style.display = 'none';
        showError('Please check your numbers');
    }
    

}

//show error
function showError(error){
    //create dic
    const errorDiv = document.createElement('div');

    // get elemets
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    //add class
    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError, 3000);


}

//clear error
function clearError(){
    document.querySelector('.alert').remove();
}