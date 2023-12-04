const store = 'projects';
const r = indexedDB.open('RegistradoDB', 1);
fetch('projects.json').then((e)=>console.log(e)).catch((e)=>console.log(e));
r.addEventListener('error', (err) => {
	console.error(err);
});
r.addEventListener('success', (evt) => {
	const db = evt.target.result;
	const tx = db.transaction([store], 'readonly', { durability: 'default' });
	tx.addEventListener('error', (err) => {
        	console.error(err);
    	});
	tx.addEventListener('complete', (evt) => {
        	console.log(evt);
    	});
	const objectStore = tx.objectStore(store);
	const getRequest = objectStore.getAll();
	getRequest.addEventListener('error', () => {});
	getRequest.addEventListener('success', () => {
		const out = document.getElementsByTagName('main')[0];
		for (var obj of getRequest.result) {
			var e = document.createElement('p');
			e.textContent = obj.name;
			out.appendChild(e);
		}
	});
			
});
r.addEventListener('upgradeneeded', (evt) => {
	if (evt.oldVersion < evt.newVersion) {
		db = evt.target.result;
		const objectStore = db.createObjectStore(store, {
        		keyPath: 'id',
        		autoIncrement: true
    		});
		objectStore.createIndex('name', 'name', { unique: true, multiEntry: false });
		for (var i = 0; i < 100; i++) {
			objectStore.add({
       		 		name: 'test'+i
    			});
		}
	}
});
