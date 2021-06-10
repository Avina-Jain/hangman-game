const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');


const words = ["ancient","android","animals","another","answers","anxiety","anymore","appears","applied","applies","arrived","article","artists","aspects","attacks","attempt","authors","average","awarded","awesome","absence","accused","acquire","actress","adapter","adopted","calling","cameras","capable","capital","captain","capture","careful","carried","causing","centers","central","century","certain","chances","changed","changes","channel","chapter","charged","charges","factors","factory","faculty","failure","falling","farmers","fashion","feature","federal","feeling","figures","finally","finance","finding","fishing","fitness","flowers","focused","follows","foreign","forever","formula","forward","founded","freedom","friends","designs","desktop","despite","details","develop","devices","digital","discuss","disease","display","diverse","doctors","dollars","drivers","driving","dropped","dynamic","density","deposit","derived","deserve","desired","destroy","diamond","disable","dispute","divided","divorce","drawing","dressed","funding","further","excited","experts","explain","explore","extreme","emailed","embassy","emerald","emotion","empathy","emperor","employs","empower","enacted","enforce","enzymes","escaped","estates","exceeds","exclude","excuses","exhibit","expands","expects","expired","expires","exploit","exports","extends","waiting","walking","wanting","warning","watched","weapons","wearing","weather","website","wedding","weekend","welcome","western","whereas","whether","willing","windows","winning","without","workers","working","illegal","illness","imagine","improve","include","initial","insight","install","instead","intense","islands","imagery","imaging","immense","implied","implies","imports","imposed","machine","managed","manager","markets","married","massive","matters","maximum","meaning","measure","medical","meeting","members","mention","message","methods","million","minimum","minutes","missing","quality","quarter","reached","readers","reading","reality","realize","reasons","receive","recipes","records","reduced","reflect","regions","regular","related","release","remains","removal","variety","various","happens","healthy","hearing","heavily","helpful","helping","herself","highest","highway","himself","history","holding","holiday","hosting","housing","however","hundred","husband","honesty","honored","honours","hopeful","horizon","hormone","hospice","vehicle","version","victims","victory","village","virtual","visible","visited","vitamin","vaccine","vampire","percent","perfect","perform","perhaps","periods","persons","picture","planned","plastic","nations","natural","neither","network","nothing","noticed","nuclear","numbers","nearest","needles","neurons","newborn","nominal","nominee","notably","notices","nucleus","nursery","players","playing","pleased","popular","portion","premium","prepare","present","prevent","primary","privacy","variant","varsity","varying","veggies","verdict","veteran","vicious","villain","violate","viruses","visions","visuals","volcano","removed","replace","reports","request","require","respect","respond","results","returns","revenue","reviews","roughly","quickly","quantum","queries","quicker","mission","mistake","mixture","moments","monitor","monthly","morning","muscles","musical","impress","impulse","incomes","indoors","induced","indulge","writers","writing","written","charity","cheaper"];
let selectedWord = words[Math.floor(Math.random()*words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

	const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won! 🏆';
		finalMessageRevealWord.innerText = '';
		popup.style.display = 'flex';

		playable = false;
	}
}

// Update the wrong letters
function updateWrongLettersEl() {
	// Display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

	// Display parts
    figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately you lost. 😕';
		finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
		popup.style.display = 'flex';

		playable = false;
	}
}

// Show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
	if (playable) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();
				} else {
					showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} else {
					showNotification();
				}
			}
		}
	}
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
	playable = true;

	//  Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

if(window.matchMedia('(prefers-color-scheme: dark)').matches){
	document.documentElement.setAttribute("dark", true)
}

displayWord();

