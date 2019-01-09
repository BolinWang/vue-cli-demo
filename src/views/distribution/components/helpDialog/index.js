import Vue from 'vue';
import store from '@/vuex/store'
import helpDialog from './helpDialog.vue';

var HelpDialogConstructor = Vue.extend(helpDialog);

//控制单例
var isSingleton = true;
var isInstance = false;

var HelpDialogC = function(option) {
	//控制单例
	if(isSingleton && isInstance) return;
	// isInstance = true;

	let { callback, el } = option || {};
	let instance = new HelpDialogConstructor({ 
	    store,
		el: (el || document.body).appendChild(document.createElement('div'))
	});

	if (typeof Promise !== 'undefined') {
		return new Promise(function(resolve, reject) {
			instance.callback = function(url){

				isInstance = false;

				if(typeof callback === 'function'){
					callback(url);
				}
    			resolve();
    		}
    	});	
	}else{
		instance.callback = function(url){
			
			isInstance = false;

			if(typeof callback === 'function'){
				callback(url);
			}
		}
	}

};

export default HelpDialogC;
export { HelpDialogC };
