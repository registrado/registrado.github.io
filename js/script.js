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
		for (var i = 0; i < 10; i++) {
			objectStore.add({
   		 		name: 'https://github.com/project'+i
			});
		}
	}
});


(function(){
    // to get current year
    function getYear() {
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        document.querySelector("#displayYear").innerHTML = currentYear;
    }

    getYear();

    // nice select
    $(document).ready(function () {
        $('select').niceSelect();
    });

    // date picker
    $(function () {
        $("#inputDate").datepicker({
            autoclose: true,
            todayHighlight: true
        }).datepicker('update', new Date());
    });

    // owl carousel slider js
    $('.team_carousel').owlCarousel({
        loop: true,
        margin: 15,
        dots: true,
        autoplay: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                margin: 0
            },
            576: {
                items: 2,
            },
            992: {
                items: 3
            }
        }
    });
})();


var c = document.createElement('canvas');
c.width = 480;
c.height = 320;
document.body.appendChild(c);
var gl = c.getContext('webgl');
gl.clearColor(Math.random(), Math.random(), Math.random(), 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
