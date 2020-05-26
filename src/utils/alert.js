const setAlertType = sentence => {
	sentence = sentence.split(',')[1].toLowerCase();

	if (sentence.includes('hälytys')) {
		return 'palohälytys';
	} else if (sentence.includes('palo')) {
		return 'tulipalo';
	} else if (sentence.includes('vahingontorjunta')) {
		return 'vahingontorjunta';
	} else if (sentence.includes('tie')) {
		return 'tieliikenneonnettomuus';
	} else if (sentence.includes('vesi') && !sentence.includes('öljy')) {
		return 'vesiliikenneonnettomuus';
	} else if (sentence.includes('raide')) {
		return 'raideliikenneonnettomuus';
	} else if (sentence.includes('ilma')) {
		return 'ilmaliikenneonnettomuus';
	} else if (sentence.includes('ensivaste')) {
		return 'ensivastetehtävä';
	} else if (sentence.includes('ihmisen')) {
		return 'ihmisen pelastaminen';
	} else if (sentence.includes('eläimen')) {
		return 'eläimen pelastaminen';
	} else if (sentence.includes('vaarallisen')) {
		return 'vaarallisen aineen onnettomuus';
	} else if (sentence.includes('ymp.onnet')) {
		return 'ympäristöonnettomuus';
	} else {
		return 'muu';
	}
};

export default setAlertType;
