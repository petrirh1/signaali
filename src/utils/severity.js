const setSeverity = sentence => {
	if (sentence.includes('keskisuuri')) {
		return 'keskisuuri';
	} else if (sentence.includes('suuri')) {
		return 'suuri';
	} else {
		return 'pieni';
	}
};

export default setSeverity;
