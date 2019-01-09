import Vue from 'vue';
import store from '@/vuex/store'
import putForwardDialog from './putForwardDialog.vue';

var PutForwardDialogConstructor = Vue.extend(putForwardDialog);

//控制单例
var isSingleton = true;
var isInstance = false;

var PutForwardDialogC = function(option) {
	//控制单例
	if(isSingleton && isInstance) return;
	// isInstance = true;

	let { callback, el } = option || {};
	let instance = new PutForwardDialogConstructor({ 
	    store,
		el: (el || document.body).appendChild(document.createElement('div'))
	});

	if (typeof Promise !== 'undefined') {
		return new Promise(function(resolve, reject) {
			instance.callback = function(amount){

				isInstance = false;

				if(typeof callback === 'function'){
					callback(amount);
				}
    			resolve();
    		}
    	});	
	}else{
		instance.callback = function(amount){
			
			isInstance = false;

			if(typeof callback === 'function'){
				callback(amount);
			}
		}
	}

};

export default PutForwardDialogC;
export { PutForwardDialogC };
