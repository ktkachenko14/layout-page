function resetCalculator(curValue) { 
    $('#display').val(curValue); 
    $('.function-button').removeClass('pendingFunction'); 
    $('#display').data('isPendingFunction', false); 
    $('#display').data('thePendingFunction', ''); 
    $('#display').data('valueOneLocked', false); 
    $('#display').data('valueTwoLocked', false); 
    $('#display').data('valueOne', curValue); 
    $('#display').data('valueTwo', 0); 
    $('#display').data('fromPrevious', false); 
    $('#display').data('operation', '');
}

$('.num-button').click(function(){ 
  
    if ($('#display').data('fromPrevious') === true) { 
  
        resetCalculator($(this).text()); 
      
    } else if ($('#display').data('isPendingFunction') === true && $('#display').data('valueOneLocked') === false) { 
        $('#display').data('valueOne', $('#display').val()); 
        $('#display').data('valueOneLocked', true); 
      
        $('#display').val($(this).text()); 
        $('#display').data('valueTwo', $('#display').val()); 
        $('#display').data('valueTwoLocked', true); 
  
    // Clicking a number AGAIN, after first number locked and already value for second number    
    } else if ($('#display').data('isPendingFunction') === true && $('#display').data('valueOneLocked') === true) { 
        let curValue = $('#display').val(); 
        let toAdd = $(this).text(); 
  
        let newValue = curValue + toAdd; 
  
        $('#display').val(newValue); 
      
        $('#display').data('valueTwo', $('#display').val()); 
        $('#display').data('valueTwoLocked', true); 
  
    // Clicking on a number fresh    
    } else { 
        let curValue = $('#display').val(); 
        if (curValue ==='0') { 
            curValue = ''; 
        } 
        let toAdd = $(this).text(); 
  
        let newValue = curValue + toAdd; 
  
        $('#display').val(newValue); 
  
    } 
      
});

$('.function-button').click(function(){ 

    if ($('#display').data('fromPrevious') === true) { 
        resetCalculator($('#display').val()); 
        $('#display').data('valueOneLocked', false); 
        $('#display').data('fromPrevious', false) 
    } 
    let curValue = $('#display').val(); 


    let pendingFunction = $(this).text(); 
    $('#display').data('isPendingFunction', true); 
    $('#display').data('thePendingFunction', pendingFunction); 
    $('#display').data('valueOneLocked', true); 
    let newVal = curValue+pendingFunction;
    $('#display').val(newVal); 

 
    $('.function-button').removeClass('pendingFunction'); 
    $(this).addClass('pendingFunction'); 
});

function evil(fn) {
    return new Function('return ' + fn)();
  }

$('.equals-button').click(function(){ 
    let result = $('#display').val();
    
    if ($('#display').data('valueOneLocked') === true && $('#display').data('valueTwoLocked') === true) { 
        let finalValue = evil(result);
        if(finalValue === Infinity){
            $('#display').val('ERROR');
        } else {
            $('#display').val(finalValue); 
            resetCalculator(finalValue); 
            $('#display').data('fromPrevious', true);  
        }
         
        if(finalValue !== Infinity){
          $('#result-block').prepend(`<ul><li class="item-result">
                                        <div class="circle"></div>
                                        <p class="result-box">${result}=${finalValue}</p>
                                        <div class="remove-box">X</div>
                                    </li></ul>`);  
   
        } 
        
        $('.circle').click(function(){
            $(this).toggleClass('red-color');  
        });
                  
        $('.remove-box').click(function(e){
            console.log(e.target)
            $(this).closest('.item-result').remove();
        });

        $('.result-box').filter(function(){
            return this.innerHTML.match(/48/g);
        }).css('text-decoration', 'underline');

        $('#result-block').scroll(function(){
            console.log('Scroll Top:  ', this.scrollTop);
        });
                      
    } else { 
        // both numbers are not locked, do nothing. 
    } 
      
});

$('.clear-button').click(function(){ 
    resetCalculator('0'); 
});






