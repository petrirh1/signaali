const setIcon = sentence => {
	if (typeof sentence !== 'string') return 'warning';

	sentence = sentence.toLowerCase();

	if (sentence.includes('hälytys')) {
		return 'notifications_active';
	} else if (sentence.includes('palo')) {
		return 'whatshot';
	} else if (sentence.includes('vahingontorjunta')) {
		return 'eco';
	} else if (sentence.includes('tie')) {
		return 'directions_car';
	} else if (sentence.includes('vesi') && !sentence.includes('öljy')) {
		return 'directions_boat';
	} else if (sentence.includes('raide')) {
		return 'directions_subway';
	} else if (sentence.includes('ilma')) {
		return 'flight';
	} else if (sentence.includes('ensivaste')) {
		return 'healing';
	} else if (sentence.includes('ihmisen')) {
		return 'emoji_people';
	} else if (sentence.includes('eläimen')) {
		return 'pets';
	} else if (sentence.includes('vaarallisen')) {
		return 'pan_tool';
	} else if (sentence.includes('öljy')) {
		return 'opacity';
	} else {
		return 'warning';
	}
};

export default setIcon;
