var CitrusPay = {};
CitrusPay.Merchant = {};
CitrusPay.Config = ( function() {
		 var ua = navigator.userAgent;
        var msie = false;
        var ff = false;
        var chrome = false;		    
        if (/MSIE (\d+\.\d+);/.test(ua))  
        {        	 
            var msie = (/MSIE (\d+\.\d+);/.test(ua));  
            var ieversion = new Number(RegExp.$1);                                  
            var environments = {
			DEBUG : 'DEBUG',
			TEST : 'TEST',
			STAGING : 'STAGING',
			SANDBOX : 'SANDBOX',
			PRODUCTION : 'PRODUCTION',
			LOCAL : 'LOCAL'
		},
		    servers = {
			TEST : 'https://test.citruspay.com/',
			DEBUG : '/citruscors/',
			STAGING : 'https://stgadmin.citruspay.com/',
			PRODUCTION : '/citruscors/',
			LOCAL : 'http://localhost:8080/admin-site/'
		},
		    paymentModes = {
			CREDIT_CARD : 'CREDIT_CARD',
			DEBIT_CARD : 'DEBIT_CARD',
			NET_BANKING : 'NET_BANKING',
			PREPAID_CARD : 'PREPAID_CARD',
			IMPS : 'IMPS'
		},
		    V2Servers = {
			TEST : 'https://test.citruspay.com/',
			DEBUG : 'https://sandbox.citruspay.com/sslperf/',
			STAGING : 'https://stg.citruspay.com/sslperf/',
			PRODUCTION : 'https://www.citruspay.com/sslperf/',
			LOCAL : 'http://localhost:8080/admin-site/sslperf/'
		};	
                      	                            
        }   
		else{			
			var environments = {
			DEBUG : 'DEBUG',
			TEST : 'TEST',
			STAGING : 'STAGING',
			SANDBOX : 'SANDBOX',
			PRODUCTION : 'PRODUCTION',
			LOCAL : 'LOCAL'
		},
		    servers = {
			TEST : 'https://test.citruspay.com/',
			DEBUG : 'https://sandboxadmin.citruspay.com/',
			STAGING : 'https://stgadmin.citruspay.com/',
			PRODUCTION : 'https://admin.citruspay.com/',
			LOCAL : 'http://localhost:8080/admin-site/'
		},
		    paymentModes = {
			CREDIT_CARD : 'CREDIT_CARD',
			DEBIT_CARD : 'DEBIT_CARD',
			NET_BANKING : 'NET_BANKING',
			PREPAID_CARD : 'PREPAID_CARD',
			IMPS : 'IMPS'
		},
		    V2Servers = {
			TEST : 'https://test.citruspay.com/',
			DEBUG : 'https://sandbox.citruspay.com/sslperf/',
			STAGING : 'https://stg.citruspay.com/sslperf/',
			PRODUCTION : 'https://www.citruspay.com/sslperf/',
			LOCAL : 'http://localhost:8080/admin-site/sslperf/'
		};										
		}		                
		env = environments.PRODUCTION;		 
	    v2Env = V2Servers.PRODUCTION;	    
		function getEnv() {
			return env;
		}

		function setEnv(environment) {
			if (environments[environment]) {
				env = environment;
				v2Env = environment;
			} else {
				env = environments.DEBUG;
				v2Env = V2Servers.DEBUG;
				citrusClientErrMsg("Invalid Environment specified: " + env);
				throw new Error("Invalid Environment specified: " + env);
			}
		}

		function getServer() {
			return servers[env];
		}

		function getV2Server() {
			return V2Servers[env];
		}

		return {
			PaymentModes : paymentModes,
			Env : environments,
			getServer : getServer,
			getEnv : getEnv,
			setEnv : setEnv,
			getV2Server : getV2Server
		};
	}());
CitrusPay.Scheme = {};
CitrusPay.Scheme.Config = {
	credit : [],
	debit : []
};
CitrusPay.Scheme.Model = {};
CitrusPay.Scheme.Model.ReformatScheme = function(data) {
	switch (data) {
	case 'visa':
		return 'VISA';
	case 'mastercard' :
	case 'master card' :
		return 'MCRD';
	case 'maestro':
	case 'maestro card' :
		return 'MTRO';
	case 'amex':
		return 'AMEX';
	case 'dinersclub' :
	case 'diners club':
		return 'DINERS';
	case 'master card' :
		return 'MCRD';
	case 'rupay card' :
		return 'RPAY';
	}
	return data;
};
CitrusPay.Validators = ( function() {
		"use strict";
		var regExp = {
			Address : /^[\s\S]{1,255}$/,
			BankId : /^[1-9][0-9]*$/, // Bank id in select tags,
			CardNumber : /^[0-9]{15,19}$/,
			CardType : /^[\s\S]{1,255}$/,
			City : /^[\s\S]{1,100}$/,
			Country : /^[\s\S]{1,100}$/,
			CustomParam : /^[0-9a-zA-Z ]{1,20}$/,
			CVV : /^[0-9]{3,4}$/,
			'4DBC' : /^[0-9]{4}$/,
			Email : /^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-zA-Z]{2,6}(?:\.[a-zA-Z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/,
			Mobile : /^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1}){0,1}98(\s){0,1}(\-){0,1}(\s){0,1}[1-9]{1}[0-9]{7}$/,
			MonthNum : /^([0-9])|1[0-1]$/,
			Name : /^(?!\s*$)[a-zA-Z .]{1,50}$/,
			Password : /^(?=.*\d)(?=.*[A-Za-z])(?=.*[A-Za-z!@#$%^&*]).{8,16}/,
			PinCode : /^(?!\s*$)[a-zA-Z0-9\-, .] ?([a-zA-Z0-9\-, .]|[a-zA-Z0-9\-, .] )*[a-zA-Z0-9\-, .]{1,7}$/,
			State : /^[\s\S]{1,100}$/,
			YearNum : /^20[1-9][0-9]$/,
			Boolean : /^true|false$/,
			URL : /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
			MMID : /^(?!0)[a-zA-Z0-9]{7}$/,
			Mobile10D : /^(?!0)[0-9]{10}$/,
			OTP : /^(?!0)[0-9]{6}$/
		};
		function regularExpressionValidatorWrapper(optional) {
			return function regularExpressionValidator(value, type, name) {
				name = name ? name + ': ' : '';
				var re = regExp[type];
				if ((value !== null && value !== undefined && value !== "") || !optional) {
					if (!re.test(value)) {
						citrusClientErrMsg("Invalid value: " + value);
						throw new Error(name + "Invalid value: " + value + " for type: " + type + ".");
					}
				}
			};
		}

		function requiredValidator(value, name) {
			var field = name;
			name = name ? name + ': ' : '';
			if (!value && value !== 0 && value !== false) {
				citrusClientErrMsg(field + " is required.");				
			}
		}

		function numberValidator(value, name) {
			name = name ? name + ': ' : '';
			if (value !== 0 && (!value || typeof value === 'number')) {
				//if (value.value !== 0 && (value == null || isNaN(value.value))) {
				citrusClientErrMsg(name + "Invalid number: " + value + ".");				
			}
		}

		function allwoedValuesValidator(value, allowedValues, name) {
			name = name ? name + ': ' : '';
			if (allowedValues.indexOf(value) === -1) {
				citrusClientErrMsg(name + "Invalid value. Possible values are: " + allowedValues.toString());
				throw new Error(name + "Invalid value. Possible values are: " + allowedValues.toString());
			}
		}

		function dateValidator(value, name) {
			var today = new Date();
			var month = today.getMonth() + 1;
			var year = today.getFullYear().toString().slice(-2);
			var expiry = value.replace(/\s+/g, '').replace("/", "");
			var inputMonth = expiry.substr(0, 2);
			var inputYear = expiry.slice(-2);
			var len = expiry.length;
			if (len == 6) {
				if (((inputMonth < month && inputYear > year) || (inputMonth >= month && inputYear >= year)) && inputMonth <= 12) {
					
				} else {
					citrusClientErrMsg("Invalid date: " + value);
					throw new Error(name + "Invalid date: " + value + ".");
				}
			} else {
				citrusClientErrMsg("Invalid date: " + value);
				throw new Error(name + "Invalid date: " + value + ".");
			}
		}

		function cardNumberValidator(number, type, name) {
			var cardNum = number.replace(/\s+/g, '');
			if (jQuery.payment.validateCardNumber(cardNum) === true) {

			} else {
				citrusClientErrMsg("Invalid card number: ");
				throw new Error(name + "Invalid card number: " + number + ".");
			}
		}

		function schemeValidator(scheme, cardType) {			
			switch (cardType) {
			case 'credit' :
				if (jQuery.inArray(scheme, CitrusPay.Scheme.Config.credit) === -1) {
					citrusClientErrMsg(scheme + " Scheme is not available for : " + cardType + " card");
					throw new Error(scheme + " Scheme is not available for : " + cardType + " card");
				}
				break;
			case 'debit' :
				if (jQuery.inArray(scheme, CitrusPay.Scheme.Config.debit) === -1) {
					citrusClientErrMsg(scheme + " Scheme is not available for : " + cardType + " card");
					throw new Error(scheme + " Scheme is not available for : " + cardType + " card");
				}
				break;
			}
		}

		return {
			RequiredValidator : requiredValidator,
			RegularExpressionValidator : regularExpressionValidatorWrapper(false),
			OptionalRegularExpressionValidator : regularExpressionValidatorWrapper(true),
			NumberValidator : numberValidator,
			AllowedValuesValidator : allwoedValuesValidator,
			DateValidator : dateValidator,
			CardNumberValidator : cardNumberValidator,
			SchemeValidator : schemeValidator
		};
	}());
CitrusPay.Rest = {};
CitrusPay.Rest.OAuth = {};
CitrusPay.Rest.OAuth.Config = ( function() {
		var tokenUrl = 'oauth/token';
		var bindUrl = 'service/v2/identity/bind';
		var signupUrl = '/Signup';
		function getTokenUrl() {
			return CitrusPay.Config.getServer() + tokenUrl;
		}

		function getBindUrl() {
			return CitrusPay.Config.getServer() + bindUrl;
		}

		function getSignUpUrl(vanity) {
			return CitrusPay.Config.getV2Server() + vanity + signupUrl;
		}

		return {
			getTokenUrl : getTokenUrl,
			getBindUrl : getBindUrl,
			getSignUpUrl : getSignUpUrl
		};
	}());
CitrusPay.Rest.OAuth.Model = {};
CitrusPay.Rest.OAuth.Model.ImplicitTokenRequest = function(data) {
	return {
		client_id : data.clientId || '',
		client_secret : data.clientSecret || '',
		grant_type : 'implicit'
	};
};
CitrusPay.Rest.OAuth.Model.PasswordTokenRequest = function(data) {
	return {
		client_id : data.clientId || '',
		client_secret : data.clientSecret || '',
		grant_type : 'password',
		username : data.username || '',
		password : data.password || ''
	};
};
CitrusPay.Rest.OAuth.Model.SignUpRequest = function(data) {
	return {
		username : data.username || '',
		firstName : data.firstName || '',
		lastName : data.lastName || '',
		phoneNumber : data.phoneNumber || '',
		merchantTxnId : data.merchantTxnId || '',
		vanityUrl : data.vanityUrl || '',
		addressStreet1 : data.addressStreet1 || '',
		addressStreet2 : data.addressStreet2 || '',
		addressCity : data.addressCity || '',
		addressState : data.addressState || '',
		addressCountry : data.addressCountry || '',
		addressZip : data.addressZip || ''
	};
};
CitrusPay.Rest.OAuth.Model.UserTokenRequest = function(data) {
	return {
		client_id : data.clientId || '',
		client_secret : data.clientSecret || '',
		grant_type : 'username',
		username : data.username || ''
	};
};
CitrusPay.Rest.OAuth.Model.UserNameRequest = function(data) {
	return {
		access_token : data.access_token,
		grant_type : 'username',
		username : data.username || '',
		mobile : data.mobile || ''
	};
};
CitrusPay.Rest.OAuth.Model.TokenResponse = function(data) {
	return {
		access_token : data.access_token
	};
};

CitrusPay.Rest.OAuth.Validators = ( function() {
		function validateImplicitTokenRequest(tokenRequest) {
			CitrusPay.Validators.RequiredValidator(tokenRequest.client_id, 'Client ID');
			CitrusPay.Validators.RequiredValidator(tokenRequest.client_secret, 'Client secret');
		}

		function validatePasswordTokenRequest(tokenRequest) {
			CitrusPay.Validators.RequiredValidator(tokenRequest.client_id, 'Client ID');
			CitrusPay.Validators.RequiredValidator(tokenRequest.client_secret, 'Client secret');
			CitrusPay.Validators.RequiredValidator(tokenRequest.username, 'Username');
			CitrusPay.Validators.RequiredValidator(tokenRequest.password, 'Password');
		}

		function validateUserTokenRequest(tokenRequest) {
			CitrusPay.Validators.RequiredValidator(tokenRequest.client_id, 'Client ID');
			CitrusPay.Validators.RequiredValidator(tokenRequest.client_secret, 'Client secret');
			CitrusPay.Validators.RequiredValidator(tokenRequest.username, 'Username');
		}

		function validateUserNameRequest(tokenRequest) {
			CitrusPay.Validators.RequiredValidator(tokenRequest.access_token, 'Access token');
			CitrusPay.Validators.RequiredValidator(tokenRequest.mobile, 'Mobile');
			CitrusPay.Validators.RequiredValidator(tokenRequest.username, 'Username');
		}

		function validateTokenResponse(tokenResponse) {
			CitrusPay.Validators.RequiredValidator(tokenResponse.access_token, 'Access token');
		}

		function validateSignupRequest(signUpRequest) {
			CitrusPay.Validators.RequiredValidator(signUpRequest.username, 'Username');
			CitrusPay.Validators.RegularExpressionValidator(signUpRequest.username, 'Email', "Email address");
			CitrusPay.Validators.RequiredValidator(signUpRequest.firstName, 'First Name');
			//CitrusPay.Validators.RequiredValidator(signUpRequest.lastName, 'Last Name');

			CitrusPay.Validators.RequiredValidator(signUpRequest.phoneNumber, 'Mobile number');
			CitrusPay.Validators.RegularExpressionValidator(signUpRequest.phoneNumber, 'Mobile10D', "Mobile number");
			CitrusPay.Validators.RequiredValidator(signUpRequest.merchantTxnId, 'Transaction Id');
			CitrusPay.Validators.RequiredValidator(signUpRequest.vanityUrl, 'Vanity Url');			 
		}

		return {
			ImplicitTokenRequestValidator : validateImplicitTokenRequest,
			PasswordTokenRequestValidator : validatePasswordTokenRequest,
			TokenResponseValidator : validateTokenResponse,
			AuthTokenValidator : validateTokenResponse,
			UserTokenRequestValidator : validateUserTokenRequest,
			UserNameRequestValidator : validateUserNameRequest,
			SignupRequestValidator : validateSignupRequest
		};
	}());

CitrusPay.Rest.OAuth.Service = ( function() {
		function requestToken(tokenRequest, cb, cbErr) {
			jQuery.ajax({
				type : 'POST',
				url : CitrusPay.Rest.OAuth.Config.getTokenUrl(),
				contentType : 'application/x-www-form-urlencoded',
				data : tokenRequest,
				success : function(response) {
					cb ? cb(CitrusPay.Rest.OAuth.Model.TokenResponse(response)) : '';
				},
				error : function(resp) {
					console.log(resp);
					console.log('Error in making oauth token request');
					cbErr ? cbErr() : '';
				}
			});
		}

		function getUserName(usernameRequest, cb, cbErr) {
			jQuery.ajax({
				type : 'POST',
				url : CitrusPay.Rest.OAuth.Config.getBindUrl(),
				contentType : 'application/x-www-form-urlencoded',
				headers : {
					Authorization : 'Bearer ' + usernameRequest.access_token
				},
				data : {
					email : usernameRequest.username,
					mobile : usernameRequest.mobile
				},				
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function() {
					console.log('Error in making oauth token request');
					cbErr ? cbErr() : '';
				}
			});
		}

		function signUpUser(signupRequest, vanity, cb, cbErr) {						
			jQuery.ajax({
				type : 'POST',				
				url : CitrusPay.Rest.OAuth.Config.getSignUpUrl(vanity),
				contentType : 'application/x-www-form-urlencoded',
				data : signupRequest,
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function() {
					console.log('Error in making sign up request');
					cbErr ? cbErr() : '';
				}
			});
		}

		return {
			requestToken : requestToken,
			getUserName : getUserName,
			signUpUser : signUpUser
		};
	}());
CitrusPay.Rest.OAuth.API = ( function() {		
		function getImplicitToken(tokenRequest, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.ImplicitTokenRequestValidator(tokenRequest);
			CitrusPay.Rest.OAuth.Service.requestToken(tokenRequest, cb, cbErr);
		}

		function signUpUser(signupRequest, vanity, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.SignupRequestValidator(signupRequest);
			CitrusPay.Rest.OAuth.Service.signUpUser(signupRequest, vanity, cb, cbErr);
		}

		function getPasswordToken(tokenRequest, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.PasswordTokenRequestValidator(tokenRequest);
			CitrusPay.Rest.OAuth.Service.requestToken(tokenRequest, cb, cbErr);
		}

		function getUserToken(tokenRequest, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.UserTokenRequestValidator(tokenRequest);
			CitrusPay.Rest.OAuth.Service.requestToken(tokenRequest, cb, cbErr);
		}

		function bindUserName(tokenRequest, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.ImplicitTokenRequestValidator(tokenRequest);
			CitrusPay.Rest.OAuth.Service.requestToken(tokenRequest, cb, cbErr);
		}

		function getUserName(usernameRequest, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.UserNameRequestValidator(usernameRequest);
			CitrusPay.Rest.OAuth.Service.getUserName(usernameRequest, cb, cbErr);
		}

		return {
			getImplicitToken : getImplicitToken,
			getPasswordToken : getPasswordToken,
			getUserToken : getUserToken,
			bindUserName : bindUserName,
			getUserName : getUserName,
			signUpUser : signUpUser
		};
	}());
CitrusPay.Rest.ProfileV2 = {};
CitrusPay.Rest.ProfileV2.Identity = {};
CitrusPay.Rest.ProfileV2.Identity.Config = ( function() {
		var urls = {			
			signup : 'service/v2/identity/new',
			passwordChange : 'service/v2/identity/me/password',
			passwordReset : 'service/v2/identity/passwords/reset',
			passwordVerify : 'v2/identity/me/password'
		};
		function getUrl(type) {
			return CitrusPay.Config.getServer() + urls[type];
		}
		return {
			getUrl : getUrl
		};
	}());
CitrusPay.Rest.ProfileV2.Identity.Model = {};
CitrusPay.Rest.ProfileV2.Identity.Model.SignupRequest = function(data) {
	return {
		email : data.email || '',
		mobile : data.mobile || ''
	};
};
 
CitrusPay.Rest.ProfileV2.Identity.Validators = ( function() {
		function validateSignupRequest(signupRequest) {
			CitrusPay.Validators.RequiredValidator(signupRequest.email, "Email address");
			CitrusPay.Validators.RegularExpressionValidator(signupRequest.email, 'Email', "Email address");
			CitrusPay.Validators.RequiredValidator(signupRequest.mobile, "Mobile number");
			CitrusPay.Validators.RegularExpressionValidator(signupRequest.mobile, 'Mobile10D', "Mobile number");
		}

		function validateChangePasswordRequest(data) {			 
			CitrusPay.Validators.RequiredValidator(data.old);
			CitrusPay.Validators.RequiredValidator(data.new);			 
		}

		function validateResetPasswordRequest(data) {
			CitrusPay.Validators.RequiredValidator(data.username);
		}

		function validateVerifyPasswordRequest(data) {
			CitrusPay.Validators.RequiredValidator(data.password);
		}

		function validateIdentity(identity) {
			CitrusPay.Validators.RequiredValidator(identity.username);
		}

		return {
			SignupRequestValidator : validateSignupRequest,
			PasswordChangeRequestValidator : validateChangePasswordRequest,
			PasswordResetRequestValidator : validateResetPasswordRequest,
			PasswordVerifyRequestValidator : validateVerifyPasswordRequest,
			IdentityValidator : validateIdentity
		};
	}());
CitrusPay.Rest.ProfileV2.Identity.Service = ( function() {
		function signup(authToken, signupRequest, cb, cbErr) {
			jQuery.ajax({
				type : 'POST',
				url : CitrusPay.Rest.ProfileV2.Identity.Config.getUrl('signup'),
				headers : {
					Authorization : 'Bearer ' + authToken.accessToken
				},
				contentType : 'application/x-www-form-urlencoded',
				data : signupRequest,
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function(xhr, status, error) {
					var err = eval("(" + xhr.responseText + ")");
					console.log(err);
					console.log('Error in making signup request.');
					cbErr ? cbErr() : '';
				}
			});
		}

		return {
			signup : signup
		};
	}());
CitrusPay.Rest.ProfileV2.Identity.API = ( function() {
		function signup(authToken, signupRequest, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.AuthTokenValidator(authToken);
			CitrusPay.Rest.ProfileV2.Identity.Validators.SignupRequestValidator(signupRequest);
			CitrusPay.Rest.ProfileV2.Identity.Service.signup(authToken, signupRequest, cb, cbErr);
		}

		return {
			signup : signup
		};
	}());
CitrusPay.Rest.Payment = {};
CitrusPay.Rest.Payment.Config = ( function() {
	}());
CitrusPay.Rest.Payment.Model = ( function() {
		function Amount(data) {
			return {
				currency : data.currency || 'INR',
				value : data.value || ''
			};
		};
		return {
			Amount : Amount
		};
	}());
CitrusPay.Rest.Payment.Validators = ( function() {
		function validateAmount(data) {
			CitrusPay.Validators.RequiredValidator(data, "Amount value");
			CitrusPay.Validators.NumberValidator(data, "Amount value");
		}

		return {
			AmountValidator : validateAmount
		};
	}());
CitrusPay.Rest.Merchant = {};
CitrusPay.Rest.Merchant.Config = ( function() {
		var tokenUrl = 'service/v1/merchant/pgsetting';
		function getTokenUrl() {
			return CitrusPay.Config.getServer() + tokenUrl;
		}

		return {
			getTokenUrl : getTokenUrl
		};
	}());
CitrusPay.Rest.Merchant.Service = ( function() {
		function getPaymentOption(vanityurl, cb, cbError) {
			jQuery.ajax({
				type : 'POST',				
				url : CitrusPay.Rest.Merchant.Config.getTokenUrl(),
				data : {
					'vanity' : vanityurl
				},
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function(error) {
					console.log("Error");
					console.log(error);
					cbError ? cbError() : '';
				}
			});
		}

		return {
			getPaymentOption : getPaymentOption
		};
	}());
CitrusPay.Rest.Merchant.API = ( function() {
		function getavailablePaymentOptions(vanityUrl, cb, cbErr) {
			CitrusPay.Rest.Merchant.Service.getPaymentOption(vanityUrl, cb, cbErr);
		}

		return {
			getavailablePaymentOptions : getavailablePaymentOptions
		}
	}());
CitrusPay.Rest.ProfileV1 = {};
CitrusPay.Rest.ProfileV1.Config = ( function() {
		var urls = {
			signup : 'v1/profile/new',
			updateProfile : 'v1/profile/me',			
			getProfile : 'service/v2/profile/me/contact',
			passwordReset : 'v1/profile/password/reset',
			passwordChange : 'v1/profile/me/password',
			passwordVerify : 'v1/profile/password/verify'
		},
		    ClassNames = {
			ProfileElement : {
				ContactDetails : 'com.citruspay.common.subscription.bean.ContactDetails',
				FastCheckoutPreferences : 'com.citruspay.common.subscription.bean.FastCheckoutPreferences'
			},
			PaymentOption : {
				NetBankingPayment : 'com.citruspay.common.subscription.util.NetBankingPayment',
				PaymentCard : {
					CreditCard : 'com.citruspay.common.subscription.util.CreditCard',
					DebitCard : 'com.citruspay.common.subscription.util.DebitCard',
					PrepaidPaymentCard : 'com.citruspay.common.subscription.util.PrepaidPaymentCard'
				}
			}
		};
		function getUrl(type) {
			return CitrusPay.Config.getServer() + urls[type];
		}

		return {
			getUrl : getUrl,
			Class : ClassNames
		};
	}());
CitrusPay.Rest.ProfileV1.Model = {};
CitrusPay.Rest.ProfileV1.Model.SignupRequest = function(data) {
	return {
		email : data.email || '',
		password : data.password || '',
		mobile : data.mobile || '',
		firstName : data.firstname || '',
		lastName : data.lastName || ''
	};
};
CitrusPay.Rest.ProfileV1.Model.PaymentOption = {
	NetBankingPayment : function(nbDetails) {
		return {
			'@class' : CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.NetBankingPayment,
			name : nbDetails.name || '',
			bank : nbDetails.bank || ''
		};
	},
	PaymentCard : ( function() {
			function genericCard(className) {
				return function(card) {
					return {
						'@class' : className,
						name : card.name || '',
						owner : card.owner || '',
						number : card.number || '',
						expiryDate : card.expiryDate || '',
						bank : card.bank || '',
						scheme : card.scheme || ''
					};
				};
			}

			return {
				CreditCard : genericCard(CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.CreditCard),
				DebitCard : genericCard(CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.DebitCard),
				PrepaidPaymentCard : genericCard(CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.PrepaidPaymentCard)
			};
		}())
};
CitrusPay.Rest.ProfileV1.Validators = ( function() {
		var classValidatorMap = ( function() {
				var map = {};
				map[CitrusPay.Rest.ProfileV1.Config.Class.ProfileElement.ContactDetails] = validateContactDetails;
				map[CitrusPay.Rest.ProfileV1.Config.Class.ProfileElement.FastCheckoutPreferences] = validateFastCheckoutPreferences;
				map[CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.NetBankingPayment] = validateNetBankingPayment;
				map[CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.PaymentCard.CreditCard] = validateCreditDebitCard;
				map[CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.PaymentCard.DebitCard] = validateCreditDebitCard;
				map[CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.PaymentCard.PrepaidPaymentCard] = validatePrepaidPaymentCard;
				return map;
			}());
		function validateSignupRequest(profileData) {
			CitrusPay.Validators.requiredValidator(profileData.email, "Email address");
			CitrusPay.Validators.regularExpressionValidator(profileData.email, 'Email', "Email address");
			CitrusPay.Validators.requiredValidator(profileData.password, "Password");
			CitrusPay.Validators.regularExpressionValidator(profileData.password, 'Password', "Password");
			CitrusPay.Validators.requiredValidator(profileData.mobile, "Mobile number");
			CitrusPay.Validators.regularExpressionValidator(profileData.mobile, 'Mobile', "Mobile number");
			CitrusPay.Validators.requiredValidator(profileData.firstName, "First name");
			CitrusPay.Validators.regularExpressionValidator(profileData.firstName, 'Name', "First name");
			CitrusPay.Validators.requiredValidator(profileData.lastName, "Last name");
			CitrusPay.Validators.regularExpressionValidator(profileData.lastName, 'Name', "Last name");
		}

		function validateChangePasswordRequest(data) {
			CitrusPay.Validators.requiredValidator(data.oldPassword);
			CitrusPay.Validators.requiredValidator(data.newPassword);
			CitrusPay.Validators.regularExpressionValidator(profileData.password, 'Password', "Password");
		}

		function validateResetPasswordRequest(data) {
			CitrusPay.Validators.requiredValidator(data.username);
		}

		function validateVerifyPasswordRequest(data) {
			CitrusPay.Validators.requiredValidator(data.password);
		}

		function validateProfile(profileData) {
			CitrusPay.Validators.requiredValidator(profileData.name);
			for (var e in profileData.elements) {
				var element = profileData.elements[e];
				CitrusPay.Validators.requiredValidator(element['@class']);
				CitrusPay.Validators.allowedValuesValidator(element['@class'], [CitrusPay.Rest.ProfileV1.Config.Class.ProfileElement.ContactDetails, CitrusPay.Rest.ProfileV1.Config.Class.ProfileElement.FastCheckoutPreferences]);
				classValidatorMap[element['@class']](element);
			}
		}

		function validateContactDetails(contact) {
			CitrusPay.Validators.requiredValidator(contact['@class']);
			CitrusPay.Validators.allowedValuesValidator(contact['@class'], [CitrusPay.Rest.ProfileV1.Config.Class.ProfileElement.ContactDetails]);
			CitrusPay.Validators.requiredValidator(contact.email, "Email address");
			CitrusPay.Validators.regularExpressionValidator(contact.email, 'Email', "Email address");
			CitrusPay.Validators.requiredValidator(contact.mobile, "Mobile number");
			CitrusPay.Validators.regularExpressionValidator(contact.mobile, 'Mobile', "Mobile number");
			CitrusPay.Validators.requiredValidator(contact.firstName, "First name");
			CitrusPay.Validators.regularExpressionValidator(contact.firstName, 'Name', "First name");
			CitrusPay.Validators.requiredValidator(contact.lastName, "Last name");
			CitrusPay.Validators.regularExpressionValidator(contact.lastName, 'Name', "Last name");
		}

		function validateFastCheckoutPreferences(fcp) {
			CitrusPay.Validators.requiredValidator(fcp['@class']);
			CitrusPay.Validators.allowedValuesValidator(fcp['@class'], [CitrusPay.Rest.ProfileV1.Config.Class.ProfileElement.FastCheckoutPreferences]);
			for (var po in fcp.paymentOptions) {
				var paymentOption = fcp.paymentOptions[po];
				CitrusPay.Validators.requiredValidator(paymentOption['@class']);
				CitrusPay.Validators.allowedValuesValidator(paymentOption['@class'], [CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.NetBankingPayment, CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.PaymentCard.CreditCard, CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.PaymentCard.DebitCard, CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.PaymentCard.PrepaidPaymentCard]);
				classValidatorMap[paymentOption['@class']](paymentOption);
			}
		}

		function validateNetBankingPayment(nb) {
			CitrusPay.Validators.requiredValidator(nb['@class']);
			CitrusPay.Validators.allowedValuesValidator(nb['@class'], [CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.NetBankingPayment]);
			CitrusPay.Validators.requiredValidator(nb.bank);
		}

		function validateCreditDebitCard(cc) {
			CitrusPay.Validators.requiredValidator(cc['@class']);
			CitrusPay.Validators.allowedValuesValidator(cc['@class'], [CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.PaymentCard.CreditCard, CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.PaymentCard.DebitCard]);
			CitrusPay.Validators.requiredValidator(cc.owner);
			CitrusPay.Validators.requiredValidator(cc.number);
			CitrusPay.Validators.requiredValidator(cc.bank);			
			CitrusPay.Validators.requiredValidator(cc.expiryDate);
		}

		function validatePrepaidPaymentCard(pp) {
			CitrusPay.Validators.requiredValidator(pp['@class']);
			CitrusPay.Validators.allowedValuesValidator(pp['@class'], [CitrusPay.Rest.ProfileV1.Config.Class.PaymentOption.PaymentCard.PrepaidPaymentCard]);
			CitrusPay.Validators.requiredValidator(pp.owner);
			CitrusPay.Validators.requiredValidator(pp.number);
			CitrusPay.Validators.requiredValidator(pp.bank);
			CitrusPay.Validators.requiredValidator(pp.expiryDate);			
			CitrusPay.Validators.requiredValidator(pp.scheme);
		}

		return {
			SignupRequestValidator : validateSignupRequest,
			PasswordChangeRequestValidator : validateChangePasswordRequest,
			PasswordResetRequestValidator : validateResetPasswordRequest,
			PasswordVerifyRequestValidator : validateVerifyPasswordRequest,
			ProfileValidator : validateProfile
		};
	}());
CitrusPay.Rest.ProfileV1.Service = ( function() {
		function signup(authToken, signupRequest, cb, cbErr) {
			jQuery.ajax({
				type : 'POST',
				url : CitrusPay.Rest.ProfileV1.Config.getUrl('signup'),
				headers : {
					Authorization : 'Bearer ' + authToken.accessToken
				},
				contentType : 'application/x-www-form-urlencoded',
				data : signupRequest,
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function() {
					console.log('Error in making signup request.');
					cbErr ? cbErr() : '';
				}
			});
		}

		function profileGet(authToken, cb, cbErr) {
			jQuery.ajax({
				type : 'GET',
				url : CitrusPay.Rest.ProfileV1.Config.getUrl('getProfile'),
				headers : {
					Authorization : 'Bearer ' + authToken.accessToken
				},
				contentType : 'application/json',
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function() {
					console.log('Error in making get profile request.');
					cbErr ? cbErr() : '';
				}
			});
		}

		return {
			signup : signup,
			profileGet : profileGet
		};
	}());
CitrusPay.Rest.ProfileV1.API = ( function() {
		function signup(authToken, signupRequest, cb) {
			CitrusPay.Rest.OAuth.Validators.AuthTokenValidator(authToken);
			CitrusPay.Rest.ProfileV1.Validators.SignupRequestValidator(signupRequest);
			CitrusPay.Rest.ProfileV1.Service.signup(authToken, signupRequest, cb);
		}

		function profileUpdate(authToken, profile, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.AuthTokenValidator(authToken);			
			CitrusPay.Rest.ProfileV1.Service.profileUpdate(authToken, profile, cb, cbErr);
		}

		function profileGet(authToken, cb) {
			CitrusPay.Rest.OAuth.Validators.AuthTokenValidator(authToken);
			CitrusPay.Rest.ProfileV1.Service.profileGet(authToken, cb);
		}

		return {
			signup : signup,
			profileUpdate : profileUpdate,
			profileGet : profileGet
		};
	}());
CitrusPay.Rest.ProfileV2.Profile = {};
CitrusPay.Rest.ProfileV2.Profile.Config = ( function() {
		var urls = {
			contact : 'service/v2/profile/me/contact',
			payment : 'service/v2/profile/me/payment',
			prepaid : 'service/v2/profile/me/prepaid',
			mobileapp : 'service/v2/profile/me/mobileapp',
			addOption : 'service/v2/profile/me/payment'
		},
		    Classes = {
			ProfileElement : {
				Contact : 'contact',
				Payment : 'payment',
				Prepaid : 'prepaid',
				MobileApp : 'mobileapp'
			},
			PaymentOption : {
				CreditCardPayment : 'credit',
				DebitCardPayment : 'debit',
				NetBankingPayment : 'netbanking',
				IMPSPayment : 'imps'
			}
		};
		function getUrl(type) {
			return CitrusPay.Config.getServer() + urls[type];
		}

		return {
			Class : Classes,
			getUrl : getUrl
		};
	}());
CitrusPay.Rest.ProfileV2.Profile.Model = {};
CitrusPay.Rest.ProfileV2.Profile.Model.ProfileElement = ( function() {
		var types = {
			contact : 'contact',
			prepaid : 'prepaid',
			mobileapp : 'mobileapp',
			payment : 'payment'
		};
		function contact(data) {
			return {
				type : types.contact,
				firstName : data.firstName || '',
				lastName : data.lastName || '',
				email : data.email || '',
				mobile : data.mobile || ''
			};
		};
		function prepaid(data) {
			return {
				type : types.prepaid,
				currency : data.currency || '',
				cashoutAccount : data.cashoutAccount || CitrusPay.Rest.ProfileV2.Profile.Model.TransferRecipientAccount({})
			};
		};
		function mobileApp(data) {
			return {
				type : 'mobileapp',
				deviceKey : data.deviceKey || ''
			};
		};
		function payment(data) {
			return {
				type : 'payment',
				defaultOption : data.defaultOption || '',
				paymentOptions : data.paymentOptions || []
			};
		};
		function card(data) {
			return {
				type : "payment",
				paymentOptions : [{
					owner : data.owner,
					number : data.number,
					scheme : data.scheme,
					type : data.type,
					expiryDate : data.expiry
				}]
			}
		}

		function netBanking(data) {
			return {
				type : "payment",
				paymentOptions : [{
					type : "netbanking",
					bank : data.bank,
					owner : data.owner
				}]
			}
		}

		return {
			Type : types,
			Contact : contact,
			Prepaid : prepaid,
			MobileApp : mobileApp,
			Payment : payment,
			Card : card,
			NetBanking : netBanking
		};
	}());
CitrusPay.Rest.ProfileV2.Profile.Model.TransferRecipientAccount = function(data) {
	return {
		owner : data.owner || '',
		number : data.number || '',
		branch : data.branch || ''
	};
};
CitrusPay.Rest.ProfileV2.Profile.Model.PaymentOption = ( function() {
		var types = {
			credit : 'credit',
			debit : 'debit',
			netbanking : 'netbanking',
			imps : 'imps'
		};
		function genericPayment(type) {
			return function(data) {
				return {
					type : type,
					token : data.token || '',
					name : data.name || '',
					owner : data.owner || '',
					number : data.number || '',
					expiryDate : data.expiryDate || '',
					bank : data.bank || '',
					scheme : data.scheme || '',
					mmid : data.mmid || '',
					impsRegisteredMobile : data.impsRegisteredMobile || ''
				};
			};
		}

		return {
			Type : types,
			CreditCardPayment : genericPayment('credit'),
			DebitCardPayment : genericPayment('debit'),
			NetBankingPayment : genericPayment('netbanking'),
			IMPSPayment : genericPayment('imps')
		};
	}());
CitrusPay.Rest.ProfileV2.Profile.Validators = ( function() {
		var classValidatorMap = ( function() {
				var map = {};
				map[CitrusPay.Rest.ProfileV2.Profile.Config.Class.ProfileElement.Contact] = validateContact, map[CitrusPay.Rest.ProfileV2.Profile.Config.Class.ProfileElement.Prepaid] =
				validatePrepaid, map[CitrusPay.Rest.ProfileV2.Profile.Config.Class.ProfileElement.MobileApp] =
				validateMobileApp, map[CitrusPay.Rest.ProfileV2.Profile.Config.Class.ProfileElement.Payment] =
				validatePayment
				map[CitrusPay.Rest.ProfileV2.Profile.Config.Class.PaymentOption.CreditCardPayment] = validateCreditCardPayment;
				map[CitrusPay.Rest.ProfileV2.Profile.Config.Class.PaymentOption.DebitCardPayment] = validateDebitCardPayment;
				map[CitrusPay.Rest.ProfileV2.Profile.Config.Class.PaymentOption.NetBankingPayment] = validateNetBankingPayment;
				map[CitrusPay.Rest.ProfileV2.Profile.Config.Class.PaymentOption.IMPSPayment] = validateIMPSPayment;
				return map;
			}());
		function validateContact(contact) {
			CitrusPay.Validators.AllowedValuesValidator(contact.type, [CitrusPay.Rest.ProfileV2.Profile.Config.Class.ProfileElement.Contact], 'Contact type');
			CitrusPay.Validators.RequiredValidator(contact.firstName, 'First Name');
			CitrusPay.Validators.RequiredValidator(contact.lastName, 'LastName');
			CitrusPay.Validators.RequiredValidator(contact.email, 'Email address');
			CitrusPay.Validators.RequiredValidator(contact.mobile, 'Mobile number');
			CitrusPay.Validators.RegularExpressionValidator(contact.firstName, 'Name', 'First Name');
			CitrusPay.Validators.RegularExpressionValidator(contact.lastName, 'Name', 'Last Name');
			CitrusPay.Validators.RegularExpressionValidator(contact.firstName, 'Email', 'Email address');
			CitrusPay.Validators.RegularExpressionValidator(contact.firstName, 'Mobile', 'Mobile number');
		}

		function validatePrepaid(prepaid) {
			CitrusPay.Validators.AllowedValuesValidator(prepaid.type, [CitrusPay.Rest.ProfileV2.Profile.Config.Class.ProfileElement.Prepaid], 'Prepaid type');
			CitrusPay.Validators.RequiredValidator(prepaid.currency, 'Prepaid currency');
			validateTransferRecipientAccount(prepaid.cashoutAccount);
		}

		function validateTransferRecipientAccount(account) {
			CitrusPay.Validators.RequiredValidator(account.owner, 'Account owner');
			CitrusPay.Validators.RequiredValidator(account.number, 'Account number');
			CitrusPay.Validators.RequiredValidator(account.branch, 'Bank branch');
		}

		function validateMobileApp(mobileApp) {
			CitrusPay.Validators.AllowedValuesValidator(mobileApp.type, [CitrusPay.Rest.ProfileV2.Profile.Config.Class.ProfileElement.MobileApp], 'MobileApp type');
			CitrusPay.Validators.RequiredValidator(mobileApp.deviceKey);
		}

		function validatePayment(payment) {
			CitrusPay.Validators.AllowedValuesValidator(payment.type, [CitrusPay.Rest.ProfileV2.Profile.Config.Class.ProfileElement.Payment], 'Payment type');			
			for (var po in payment.paymentOptions) {
				var paymentOption = payment.paymentOptions[po];
				CitrusPay.Validators.AllowedValuesValidator(paymentOption.type, [CitrusPay.Rest.ProfileV2.Profile.Config.Class.PaymentOption.CreditCardPayment, CitrusPay.Rest.ProfileV2.Profile.Config.Class.PaymentOption.DebitCardPayment, CitrusPay.Rest.ProfileV2.Profile.Config.Class.PaymentOption.NetBankingPayment, CitrusPay.Rest.ProfileV2.Profile.Config.Class.PaymentOption.IMPSPayment], 'Payment type');
				classValidatorMap[paymentOption.type](paymentOption);
			}
		}

		function validateCreditCardPayment(card) {
			CitrusPay.Validators.AllowedValuesValidator(card.type, [CitrusPay.Rest.ProfileV2.Profile.Config.Class.PaymentOption.CreditCardPayment], 'Credit card type');
			CitrusPay.Validators.RequiredValidator(card.owner);
			CitrusPay.Validators.RequiredValidator(card.number);		
			CitrusPay.Validators.RequiredValidator(card.expiryDate);
		}

		function validateDebitCardPayment(card) {
			CitrusPay.Validators.AllowedValuesValidator(card.type, [CitrusPay.Rest.ProfileV2.Profile.Config.Class.PaymentOption.DebitCardPayment], 'Debit card type');
			CitrusPay.Validators.RequiredValidator(card.owner);
			CitrusPay.Validators.RequiredValidator(card.number);			
			CitrusPay.Validators.RequiredValidator(card.expiryDate);
		}

		function validateNetBankingPayment(nb) {
			CitrusPay.Validators.AllowedValuesValidator(nb.type, [CitrusPay.Rest.ProfileV2.Profile.Config.Class.PaymentOption.NetBankingPayment], 'Net banking type');
			CitrusPay.Validators.RequiredValidator(nb.bank);
		}

		function validateIMPSPayment(imps) {
			CitrusPay.Validators.AllowedValuesValidator(imps.type, [CitrusPay.Rest.ProfileV2.Profile.Config.Class.PaymentOption.IMPSPayment], 'IMPS type');
			CitrusPay.Validators.RequiredValidator(imps.impsRegisteredMobile);
			CitrusPay.Validators.RequiredValidator(imps.mmid);
		}

		function validateProfileElement(pe) {
			CitrusPay.Validators.AllowedValuesValidator(pe.type, [CitrusPay.Rest.ProfileV2.Profile.Config.Class.ProfileElement.Contact, CitrusPay.Rest.ProfileV2.Profile.Config.Class.ProfileElement.Prepaid, CitrusPay.Rest.ProfileV2.Profile.Config.Class.ProfileElement.MobileApp, CitrusPay.Rest.ProfileV2.Profile.Config.Class.ProfileElement.Payment], 'Type');
			classValidatorMap[pe.type](pe);
		}

		return {
			ContactValidator : validateContact,
			PrepaidValidator : validatePrepaid,
			MobileAppValidator : validateMobileApp,
			PaymentValidator : validatePayment,
			ProfileElementValidator : validateProfileElement
		};
	}());
CitrusPay.Rest.ProfileV2.Profile.Service = ( function() {
		function getProfileElement(element, authToken, cb, cbErr) {
			jQuery.ajax({
				type : 'GET',
				url : CitrusPay.Rest.ProfileV2.Profile.Config.getUrl(element),
				headers : {
					Authorization : 'Bearer ' + authToken.access_token
				},
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function() {
					console.log('Error in making get profile request.');
					cbErr ? cbErr() : '';
				}
			});
		}

		function putProfileElement(element, authToken, data, cb, cbErr) {
			jQuery.ajax({
				type : 'PUT',
				url : CitrusPay.Rest.ProfileV2.Profile.Config.getUrl(element),
				headers : {
					Authorization : 'Bearer ' + authToken.access_token
				},
				contentType : 'application/json',
				data : JSON.stringify(data),
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function() {
					console.log('Error in making update profile request.');
					cbErr ? cbErr() : '';
				}
			});
		}

		function deleteProfileElement(element, authToken, name, cb) {
			jQuery.ajax({
				type : 'DELETE',
				url : CitrusPay.Rest.ProfileV2.Profile.Config.getUrl(element) + '/' + name,
				headers : {
					Authorization : 'Bearer ' + authToken.accessToken
				},
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function() {
					console.log('Error in making update profile request.');
					cbErr ? cbErr() : '';
				}
			});
		}

		function addCardDetails(optionRequest, authToken, cb, cbErr) {
			jQuery.ajax({
				type : 'PUT',
				url : CitrusPay.Rest.ProfileV2.Profile.Config.getUrl('addOption'),
				headers : {
					Authorization : 'Bearer ' + authToken.accessToken
				},
				data : optionRequest,
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function() {
					console.log('Error in adding card');
					cbErr ? cbErr() : '';
				}
			});
		}

		function addNetbankingDetails(optionRequest, authToken, name, cb, cbErr) {
			jQuery.ajax({
				type : 'PUT',
				url : CitrusPay.Rest.ProfileV2.Profile.Config.getUrl('addOption'),
				headers : {
					Authorization : 'Bearer' + authToken.accessToken
				},
				data : optionRequest,
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function() {
					console.log('Error in adding net banking');
					cbErr ? cbErr() : '';
				}
			});
		}

		return {
			getProfileElement : getProfileElement,
			putProfileElement : putProfileElement,
			deleteProfileElement : deleteProfileElement,
			addCardDetails : addCardDetails,
			addNetbankingDetails : addNetbankingDetails
		};
	}());
CitrusPay.Rest.ProfileV2.Profile.API = ( function() {
		function getProfileElement(element, authToken, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.AuthTokenValidator(authToken);
			CitrusPay.Rest.ProfileV2.Profile.Service.getProfileElement(element, authToken, cb, cbErr);
		}

		function putProfileElement(element, authToken, data, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.AuthTokenValidator(authToken);			
			CitrusPay.Rest.ProfileV2.Profile.Service.putProfileElement(element, authToken, data, cb, cbErr);
		}

		function deleteProfileElement(element, authToken, name, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.AuthTokenValidator(authToken);
			CitrusPay.Validators.RequiredValidator(name);
			CitrusPay.Rest.ProfileV2.Profile.Service.deleteProfileElement(element, authToken, name, cb, cbErr);
		}

		function addCardDetails(optionRequest, authToken, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.AuthTokenValidator(authToken);
			CitrusPay.Rest.ProfileV2.Profile.Service.addCardDetails(optionRequest, authToken, name, cb, cbErr);
		}

		function addNetbankingDetails(optionRequest, authToken, cb, cbErr) {
			CitrusPay.Rest.OAuth.Validators.AuthTokenValidator(authToken);
			CitrusPay.Rest.ProfileV2.Profile.Service.addNetbankingDetails(optionRequest, authToken, name, cb, cbErr);
		}

		return {
			getProfileElement : getProfileElement,
			putProfileElement : putProfileElement,
			deleteProfileElement : deleteProfileElement,
			addCardDetails : addCardDetails,
			addNetbankingDetails : addNetbankingDetails
		};
	}());
CitrusPay.Rest.Payment.Payment = {};
CitrusPay.Rest.Payment.Payment.Config = ( function() {
		urls = {
			moto : {
				struct : 'service/moto/authorize/struct/',
				unstruct : 'service/moto/authorize/'
			}
		};
		function getUrl(type) {
			type = type.split(".");
			var urlExt = urls;
			for (var i in type) {
				urlExt = urlExt[type[i]];
			}
			return CitrusPay.Config.getServer() + urlExt;
		}

		return {
			getUrl : getUrl
		};
	}());
CitrusPay.Rest.Payment.Payment.Model = {};
CitrusPay.Rest.Payment.Payment.Model.PaymentRequest = function(data) {
	return {
		merchantTxnId : data.merchantTxnId || '',
		amount : data.amount || CitrusPay.Rest.Payment.Model.Amount(),
		userDetails : data.userDetails || CitrusPay.Rest.Payment.Payment.Model.UserDetails(),
		returnUrl : data.returnUrl || '',		
		paymentToken : data.paymentToken || CitrusPay.Rest.Payment.Payment.Model.PaymentToken.PaymentOptionIdToken(),
		notifyUrl : data.notifyUrl || '',
		merchantAccessKey : data.merchantAccessKey || '',
		requestSignature : data.requestSignature || ''
	};
};
CitrusPay.Rest.Payment.Payment.Model.UserDetails = function(data) {
	return {
		email : data.email || '',
		firstName : data.firstName || '',
		lastName : data.lastName || '',
		address : data.address || CitrusPay.Rest.Payment.Payment.Model.Address(),
		mobileNo : data.mobileNo || ''
	};
};
CitrusPay.Rest.Payment.Payment.Model.Address = function(data) {
	return {
		street1 : data.street1 || 'NA',
		street2 : data.street2 || 'NA',
		city : data.city || 'NA',
		state : data.state || 'NA',
		country : data.country || 'NA',
		zip : data.zip || 'NA'
	};
};
CitrusPay.Rest.Payment.Payment.Model.PaymentToken = ( function() {
		function PaymentOptionIdToken(data) {
			return {
				type : 'paymentOptionIdToken',
				id : data.id || '',
				cvv : data.cvv || ''
			};
		}

		function PaymentOptionToken(data) {
			return {
				type : 'paymentOptionToken',
				paymentMode : data.paymentMode || CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment.CreditCard()
			};
		}

		function MemberPaymentOptionToken(data) {
			return {
				type : 'paymentOptionIdToken',
				id : data.id				
			};
		}

		return {
			PaymentOptionIdToken : PaymentOptionIdToken,
			PaymentOptionToken : PaymentOptionToken,
			MemberPaymentOptionToken : MemberPaymentOptionToken
		};
	}());
CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment = ( function() {
		function NetBanking(data) {
			return {
				type : 'netbanking',
				bank : data.bank || '',
				code : data.code || ''
			};
		}

		function PaymentCard(type) {
			return function(data) {
				return {
					type : type,
					scheme : data.scheme || '',
					number : data.number || '',
					holder : data.holder || '',
					expiry : data.expiry || '',
					cvv : data.cvv || ''
				};
			};
		}

		return {
			NetBanking : NetBanking,
			CreditCard : PaymentCard('credit'),
			DebitCard : PaymentCard('debit'),
			PrepaidCard : PaymentCard('prepaid')
		};
	}());
CitrusPay.Rest.Payment.Payment.Validators = ( function() {
		function validatePaymentRequest(data) {
			CitrusPay.Validators.RequiredValidator(data.merchantTxnId, "Merchant transaction id");
			CitrusPay.Rest.Payment.Validators.AmountValidator(data.amount);
			validateUserDetails(data.userDetails);
			CitrusPay.Validators.RequiredValidator(data.returnUrl, "Return url");
			CitrusPay.Validators.RegularExpressionValidator(data.returnUrl, 'URL', "Return url");
			validatePaymentToken(data.paymentToken);
			CitrusPay.Validators.OptionalRegularExpressionValidator(data.notify, 'URL', "Notify url");
			CitrusPay.Validators.RequiredValidator(data.merchantAccessKey, "Merchant access key");
			CitrusPay.Validators.RequiredValidator(data.requestSignature, "Request signature");
		}

		function validateUserDetails(data) {
			CitrusPay.Validators.RequiredValidator(data.email, "Email address");
			CitrusPay.Validators.RegularExpressionValidator(data.email, 'Email', "Email address");
			// CitrusPay.Validators.RequiredValidator(data.firstName, "First name");
			// CitrusPay.Validators.RegularExpressionValidator(data.firstName, 'Name', "First name");			 
			validateAddress(data.address);
			// CitrusPay.Validators.RequiredValidator(data.mobileNo, "Mobile number");
		}

		function validateAddress(data) {
		}

		function validatePaymentToken(data) {
			var classValidatorMap = {
				paymentOptionIdToken : validatePaymentOptionIdToken,
				paymentOptionToken : validatePaymentOptionToken
			};
			function validatePaymentOptionIdToken(data) {
				CitrusPay.Validators.RequiredValidator(data.id, "Payment option id");				
				CitrusPay.Validators.OptionalRegularExpressionValidator(data.cvv, "CVV");
			}

			function validatePaymentOptionToken(data) {
				validateModeOfPayment(data.paymentMode);
			}


			CitrusPay.Validators.RequiredValidator(data.type, "Payment token type");
			classValidatorMap[data.type](data);
		}

		function validateModeOfPayment(data) {
			var classValidatorMap = {
				netbanking : validateNetBanking,
				credit : validateCard,
				debit : validateCard,
				prepaid : validatePrepaid
			};
			function validateNetBanking(data) {
				CitrusPay.Validators.RequiredValidator(data.bank, "Bank name");
				CitrusPay.Validators.RequiredValidator(data.code, "Bank");
			}

			function validateCard(data) {
				data.scheme = CitrusPay.Scheme.Model.ReformatScheme(data.scheme);
				CitrusPay.Validators.RequiredValidator(data.scheme, "Card number");						
				CitrusPay.Validators.RequiredValidator(data.number, "Card number");
				 if (data.scheme !== 'MTRO') {
					CitrusPay.Validators.CardNumberValidator(data.number, 'CardNumber', "Card number");
				 }
				if (data.scheme === 'MTRO') {
					var d = new Date();
					data.expiry = ("12" + "/" + (d.getFullYear() + 1));
					var randomnumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
					data.cvv = randomnumber;
				}
				CitrusPay.Validators.RegularExpressionValidator(data.number, 'CardNumber', "Card number");
				CitrusPay.Validators.RequiredValidator(data.holder, "Card holder name");
				CitrusPay.Validators.RegularExpressionValidator(data.holder, 'Name', "Card holder");
				CitrusPay.Validators.DateValidator(data.expiry, "Card expiry");
				CitrusPay.Validators.RequiredValidator(data.expiry, "Card expiry");
				CitrusPay.Validators.RequiredValidator(data.cvv, "CVV number");
				CitrusPay.Validators.RegularExpressionValidator(data.cvv, 'CVV', "CVV number");
			}

			function validatePrepaid(data) {
				CitrusPay.Validators.RequiredValidator(data.scheme, "Card Scheme");
				CitrusPay.Validators.RequiredValidator(data.holder, "Card holder name");
			}

			CitrusPay.Validators.RequiredValidator(data.type, "Mode of payment type");
			classValidatorMap[data.type](data);
		}

		return {
			PaymentRequestValidator : validatePaymentRequest
		};
	}());
function getUrlVars(url) {
	var vars = {};
	var parts = window.parent.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value;
	});
	return vars;
}

CitrusPay.Rest.Payment.Payment.Service = ( function() {
		function makePayment(paymentRequest, vanityUrl, cb, cbErr) {
			jQuery.ajax({
				async : false,
				type : 'POST',
				url : CitrusPay.Rest.Payment.Payment.Config.getUrl('moto.struct') + vanityUrl,
				contentType : 'application/json',
				data : JSON.stringify(paymentRequest),
				success : function(response) {
					cb ? cb(response) : '';
				},
				error : function() {
					console.log('Error in making payment request.');
					cbErr ? cbErr() : '';
				}
			});
			// end of ajax
		}

		return {
			makePayment : makePayment
		};
	}());
CitrusPay.Rest.Payment.Payment.API = ( function() {
		function makePayment(paymentRequest, vanityUrl, cb, cbErr) {
			CitrusPay.Rest.Payment.Payment.Validators.PaymentRequestValidator(paymentRequest);
			CitrusPay.Rest.Payment.Payment.Service.makePayment(paymentRequest, vanityUrl, cb, cbErr);
		}
		return {
			makePayment : makePayment
		};
	}());
CitrusPay.Prepaid = {};
CitrusPay.Prepaid.Config = ( function() {
		var balanceUrl = 'service/v2/mycard';
		var paymentUrl = 'service/v2/prepayment/pay'
		function getBalanceUrl() {
			return CitrusPay.Config.getServer() + balanceUrl;
		}

		function getPaymentUrl() {
			return CitrusPay.Config.getServer() + paymentUrl;
		}

		return {
			getBalanceUrl : getBalanceUrl,
			getPaymentUrl : getPaymentUrl
		};
	}());
CitrusPay.Prepaid.Model = ( function() {
		function PaymentRequest(data) {
			return {
				merchantTransactionId : data.merchantTransactionId,
				amount : data.amount,
				currency : data.currency || 'INR',
				comment : data.comment || ""
			};
		};
		return {
			PaymentRequest : PaymentRequest
		};
	}());
CitrusPay.Prepaid.Service = ( function() {
		function getBalance(authToken, cb, cbErr) {
			jQuery.ajax({
				type : 'GET',
				url : CitrusPay.Prepaid.Config.getBalanceUrl(),				
				dataType : 'json',
				type : "GET",
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Authorization", "Bearer 11189246-32eb-4882-aed9-36b32aeb112b");
				},
				success : function(response) {
					console.log(response);
					cb ? cb(response) : '';
				},
				error : function(a, b, c) {
					console.log(JSON.stringify(a) + JSON.stringify(b) + JSON.stringify(c));
					console.log('Error in making oauth token request');
					cbErr ? cbErr() : '';
				}
			});
		}

		function makePayment(paymentRequest, authToken, cb, cbErr) {
			jQuery.ajax({
				type : 'POST',
				url : CitrusPay.Prepaid.Config.getPaymentUrl(), 
				headers : {
					Authorization : 'Bearer ' + authToken.access_token
				},
				data : paymentRequest,
				success : function(response) {
					console.log(response);
					cb ? cb(response) : '';
				},
				error : function(a, b, c) {
					console.log(JSON.stringify(a) + JSON.stringify(b) + JSON.stringify(c));
					console.log('Error in making payment request');
					cbErr ? cbErr() : '';
				}
			});
		}

		return {
			getBalance : getBalance,
			makePayment : makePayment
		};
	}());
CitrusPay.Prepaid.API = ( function() {
		function getBalance(authToken, cb, cbErr) {
			CitrusPay.Prepaid.Service.getBalance(authToken, cb, cbErr);
		}

		function makePayment(paymentRequest, authToken, cb, cbErr) {
			CitrusPay.Prepaid.Service.makePayment(paymentRequest, authToken, cb, cbErr);
		}

		return {
			getBalance : getBalance,
			makePayment : makePayment
		};
	}());
var mtx = jQuery("#citrusMerchantTxnId").val();
var amount = CitrusPay.Rest.Payment.Model.Amount({
	value : jQuery('#citrusAmount').val()
});
function removeNulls(obj) {
	var isArray = obj instanceof Array;
	for (var k in obj) {
		if (obj[k] === null)
			isArray ? obj.splice(k, 1) :
			delete obj[k];
		else if ( typeof obj[k] == "object")
			removeNulls(obj[k]);
	}
	return 1;
}

function citrusFilterWallet(paymentOptions, wallet) {
	var len = wallet.length;
	var nbLength = paymentOptions.netBanking.length;
	var ccLength = paymentOptions.creditCard.length;
	var dcLength = paymentOptions.debitCard.length,
	    type;
	var availableBanks = [];
	var availableCC = [];
	var availableDC = [];	
	for (var i = 0; i < nbLength; i++) {
		availableBanks.push(paymentOptions.netBanking[i].bankName);
	}	
	for (var i = 0; i < ccLength; i++) {
		if (jQuery.inArray(paymentOptions.creditCard[i].toLowerCase(), availableCC) === -1) {
			availableCC.push(paymentOptions.creditCard[i].toLowerCase());
			type = CitrusPay.Scheme.Model.ReformatScheme(paymentOptions.creditCard[i].toLowerCase());
			CitrusPay.Scheme.Config.credit.push(type);
		}
	}
	paymentOptions.creditCard = availableCC;	
	for (var i = 0; i < dcLength; i++) {
		if (jQuery.inArray(paymentOptions.debitCard[i].toLowerCase(), availableCC) === -1) {
			availableDC.push(paymentOptions.debitCard[i].toLowerCase());
			type = CitrusPay.Scheme.Model.ReformatScheme(paymentOptions.debitCard[i].toLowerCase());
			CitrusPay.Scheme.Config.debit.push(type);
		}
	}
	paymentOptions.debitCard = availableDC;
	var el;
	var filteredWallet = {};
	for (var i = 0; i < len; i++) {
		switch(wallet[i].type) {
		case 'netbanking' :
			el = wallet[i].bank;
			if (jQuery.inArray(el, availableBanks) === -1) {
				delete wallet[i];
			}
			break;
		case 'credit'    :
			if (wallet[i].scheme !== null && wallet[i].scheme !== undefined) {
				el = wallet[i].scheme.toLowerCase();
				if (jQuery.inArray(el, availableCC) === -1) {
					delete wallet[i];
				}
			}
			break;
		case 'debit'     :
			if (wallet[i].scheme !== null && wallet[i].scheme !== undefined) {
				el = wallet[i].scheme.toLowerCase();
				if (jQuery.inArray(el, availableDC) === -1) {
					delete wallet[i];
				}
			}
			break;
		default          :
			delete wallet[i];
		}
		if (wallet[i] !== null) {
			filteredWallet[i] = wallet[i];
		}
	}
	var filteredResponse = {};
	filteredResponse.paymentOptions = paymentOptions;
	filteredResponse.wallet = wallet;
	removeNulls(filteredResponse);
	return filteredResponse;
}

function fetchmerchantPaymentOptions(availablePaymentOptions, isWalletEnabled) {
	var vanityUrl = CitrusPay.Merchant.Config.Merchant.vanityUrl;
	CitrusPay.Rest.Merchant.API.getavailablePaymentOptions(vanityUrl, function(response) {		
		var flag = isJSON(response);
		if(flag === true)	
		{ response = JSON.parse(response);  }
		var filteredResponse = citrusFilterWallet(response, availablePaymentOptions);
		if (isWalletEnabled === true) {
			var wallet = filteredResponse.wallet;
			handleCitrusWallet(wallet);
		} else {
			var paymentOptions = filteredResponse.paymentOptions;			
			handleCitrusPaymentOptions(paymentOptions);
		}
	}, function() {
		console.log("Error in retrieving the options");
	});
}

function isJSON(data) {
   var ret = true;
   try {
      JSON.parse(data);
   }catch(e) {
      ret = false;
   }
   return ret;
}

function loadPaymentOptions(auth) {
	CitrusPay.Rest.ProfileV2.Profile.API.getProfileElement(CitrusPay.Rest.ProfileV2.Profile.Model.ProfileElement.Type.payment, auth, function(payment) {
		var availablePaymentOptions = [];
		try {
			CitrusPay.Rest.ProfileV2.Profile.Validators.PaymentValidator(payment);
			var optionString = "";
			for (var i = 0,
			    len = payment.paymentOptions.length; i < len; i++) {
				availablePaymentOptions.push(payment.paymentOptions[i]);
			}
		} catch(e) {
			console.log('Incorrect payment details recieved: ');
		}
		fetchmerchantPaymentOptions(availablePaymentOptions, true);
	}, function() {
		console.log("Error making payment details request.");
		fetchmerchantPaymentOptions([], true);
	});
}

function memberPayment(modeOfPayment) {
	var paymentToken = jQuery('input[name=CitrusWalletPaymentOption]:checked').val();
	var paymentOptionIdToken;
	var isNew = 0;
	var mtx = jQuery("#citrusMerchantTxnId").val();	
    var amount = CitrusPay.Rest.Payment.Model.Amount({
	value : jQuery('#citrusAmount').val()
    });
	var vanityUrl = CitrusPay.Merchant.Config.Merchant.vanityUrl;
	var paymentObj;
	var user = CitrusPay.Rest.Payment.Payment.Model.UserDetails({
		email : jQuery('#citrusEmail').val(),
		firstName : jQuery('#citrusFirstName').val(),
		lastName : jQuery('#citrusLastName').val(),
		address : CitrusPay.Rest.Payment.Payment.Model.Address({
			street1 : jQuery('#citrusStreet1').val(),
			street2 : jQuery('#citrusStreet2').val(),
			city : jQuery('#citrusCity').val(),
			state : jQuery('#citrusState').val(),
			country : jQuery('#citrusCountry').val(),
			zip : jQuery('#citrusZip').val()
		}),
		mobileNo : jQuery('#citrusMobile').val()
	});
	if (modeOfPayment == 'netBanking') {
		if ( typeof (paymentToken) !== "undefined" && paymentToken !== null) {
			paymentOptionIdToken = CitrusPay.Rest.Payment.Payment.Model.PaymentToken.MemberPaymentOptionToken({
				id : paymentToken
			});
		} else {
			isNew = 1;
			var bankName = jQuery('#citrusAvailableOptions option:selected').text();
			var bankCode = jQuery('#citrusAvailableOptions').val();
			paymentOptionIdToken = CitrusPay.Rest.Payment.Payment.Model.PaymentToken.PaymentOptionToken({
				paymentMode : CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment.NetBanking({
					type : 'netbanking',
					bank : bankName,
					code : bankCode
				})
			});
		}
	} else if (modeOfPayment == 'card') {		
		if ( typeof (paymentToken) !== "undefined" && paymentToken !== null) {
			var token = paymentToken.split("&")[1];
			var optionindex = paymentToken.split("&")[0];
			paymentOptionIdToken = CitrusPay.Rest.Payment.Payment.Model.PaymentToken.PaymentOptionIdToken({
				type : 'paymentOptionIdToken',
				id : token,
				cvv : jQuery("#CitrusMembercvv" + optionindex).val()
			});
		} else {
			isNew = 1;
			var type = jQuery("#citrusCardType").val().toLowerCase();

			var cardNum = jQuery('#citrusNumber').val().replace(/\s+/g, '');
			var cardExp = jQuery('#citrusExpiry').val().replace(/\s+/g, '');
			switch(type) {
			case "credit" :
				paymentObj = CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment.CreditCard({
					scheme : jQuery('#citrusScheme').val(),
					number : cardNum,
					holder : jQuery('#citrusCardHolder').val(),
					expiry : cardExp,
					cvv : jQuery('#citrusCvv').val()
				});
				break;
			case "debit" :
				paymentObj = CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment.DebitCard({
					scheme : jQuery('#citrusScheme').val(),
					number : cardNum,
					holder : jQuery('#citrusCardHolder').val(),
					expiry : cardExp,
					cvv : jQuery('#citrusCvv').val()
				});
				break;
			}
			paymentOptionIdToken = CitrusPay.Rest.Payment.Payment.Model.PaymentToken.PaymentOptionToken({
				paymentMode : paymentObj
			});
		}
	} else if (modeOfPayment == 'citrusbanking') {
		paymentObj = CitrusPay.Rest.Payment.Payment.Model.ModeOfPayment.PrepaidCard({
			scheme : "CPAY",
			holder : jQuery('#citrusPrepaidCardHolder').val()
		});

		paymentOptionIdToken = CitrusPay.Rest.Payment.Payment.Model.PaymentToken.PaymentOptionToken({
			paymentMode : paymentObj
		});
	}
	var paymentRequest = CitrusPay.Rest.Payment.Payment.Model.PaymentRequest({
		returnUrl : jQuery('#citrusReturnUrl').val(),
		amount : amount,
		merchantAccessKey : CitrusPay.Merchant.Config.Merchant.accessKey,
		paymentToken : paymentOptionIdToken,
		merchantTxnId : mtx,
		requestSignature : jQuery('#citrusSignature').val(),
		userDetails : user
	});
	//add the custom parameters
	var numOfCustomParams = parseInt(jQuery("#citrusCustomParamCount").val());
	var paramName,
	    paramValue;
	if (numOfCustomParams !== null && typeof (numOfCustomParams) !== "undefined" && numOfCustomParams > 0) {
		paymentRequest.customParameters = {};
	}
	for (var i = 1; i <= numOfCustomParams; i++) {
		paramName = jQuery("#citrusCustomParamsName" + i).val();
		paramValue = jQuery("#citrusCustomParamsValue" + i).val();
		paymentRequest.customParameters[paramName] = paramValue;
	}
	CitrusPay.Rest.Payment.Payment.API.makePayment(paymentRequest, vanityUrl, function(response) {
		var flag = isJSON(response);
  		if(flag === true) 
  	    {response = JSON.parse(response);}
		if (!!response && response.pgRespCode === "0") {
			window.location = response.redirectUrl;
		} else {
			citrusServerErrorMsg(response);
		}
	}, function(e) {
		citrusServerErrorMsg(e);
		console.log('Error making payment request.');
	});//end of make payment
}

/*********************************************************************************************************************************/
function fetchPaymentOptions() {
	 //citrusMemberSignup();
	 fetchmerchantPaymentOptions([], false);	 	
}

function citrusMemberLogin() {	
	CitrusPay.Rest.OAuth.API.getPasswordToken(CitrusPay.Rest.OAuth.Model.PasswordTokenRequest({
		clientId : CitrusPay.Merchant.Config.OAuth.clients.password.clientId,
		clientSecret : CitrusPay.Merchant.Config.OAuth.clients.password.clientSecret,
		username : jQuery('#citrusEmail').val(),
		password : jQuery('#citrusPassword').val()
	}),	
	function(authToken) {
		try {
			CitrusPay.Rest.OAuth.Validators.TokenResponseValidator(authToken);
			loadPaymentOptions(authToken);
		} catch(e) {
			console.log("Invalid token received: " + JSON.stringify(authToken));
		}
	}, function() {
		citrusServerErrorMsg("Please verify the username and password");
		console.log("Error making token request.");
	});
}

function citrusMemberSignup() {
	var user = {
		username : jQuery('#citrusEmail').val(),
		firstName : jQuery('#citrusFirstName').val(),
		lastName : jQuery('#citrusLastName').val(),
		phoneNumber : jQuery('#citrusMobile').val(),
		merchantTxnId : jQuery('#citrusMerchantTxnId').val(),
		vanityUrl : CitrusPay.Merchant.Config.Merchant.vanityUrl,
		addressStreet1 : jQuery('#citrusStreet1').val(),
		addressStreet2 : jQuery('#citrusStreet2').val(),
		addressCity : jQuery('#citrusCity').val(),
		addressState : jQuery('#citrusState').val(),
		addressCountry : jQuery('#citrusCountry').val(),
		addressZip : jQuery('#citrusZip').val()
	};
	CitrusPay.Rest.OAuth.API.signUpUser(CitrusPay.Rest.OAuth.Model.SignUpRequest(user), CitrusPay.Merchant.Config.Merchant.vanityUrl, function(resp) {
		try {
			fetchmerchantPaymentOptions([], false);
		} catch(e) {
			console.log("Error in signing up ");
			fetchmerchantPaymentOptions([], false);
		}
	},	
	function() {
		console.log("Error in signing up");
		fetchmerchantPaymentOptions([], false);
	});
}
function makePayment(mode) {
	mode = mode.toLowerCase();
	switch (mode) {
	case   "card" :
		memberPayment("card");
		break;
	case "netbanking" :
		memberPayment("netBanking");
		break;
	case "citrusbanking" :
		memberPayment("citrusbanking");
		break;
	}
}