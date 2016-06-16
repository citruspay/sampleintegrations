//UI validations
jQuery(document).ready(function() {	
	jQuery.support.cors = true; 
	
	// setup card inputs;	 	
	jQuery('#citrusExpiry').payment('formatCardExpiry');
	jQuery('#citrusCvv').payment('formatCardCVC');
	jQuery('#citrusNumber').keyup(function() {
		var cardNum = jQuery('#citrusNumber').val().replace(/\s+/g, '');		
			var type = jQuery.payment.cardType(cardNum);			
			jQuery("#citrusNumber").css("background-image", "url(images/" + type + ".png)");						
			if(type!='amex')
            jQuery("#citrusCvv").attr("maxlength","3");
            else
            jQuery("#citrusCvv").attr("maxlength","4");						
			jQuery('#citrusNumber').payment('formatCardNumber');											
			jQuery("#citrusScheme").val(type);		
	});				 
}); 