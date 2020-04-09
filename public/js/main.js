var options = {
	bottom: '64px', // default: '32px'
	right: '32px', // default: '32px'
	left: 'unset', // default: 'unset'
	time: '0.5s', // default: '0.3s'
	mixColor: '#fff', // default: '#fff'
	backgroundColor: '#fff', // default: '#fff'
	buttonColorDark: '#0275d8', // default: '#100f2c'
	buttonColorLight: '#fff', // default: '#fff'
	saveInCookies: false, // default: true,
	label: '🌓', // default: ''
	autoMatchOsTheme: true // default: true
};

const darkmode = new Darkmode(options);
darkmode.showWidget();
console.log(darkmode.isActivated());

let bars = document.querySelector('.bar-icon');

bars.addEventListener('click', function() {
	// console.log(open);
	document.querySelector('.open').classList.toggle('active');
});

document.querySelector('.go-back').addEventListener('click', function() {
	document.querySelector('.open').classList.toggle('active');
});
