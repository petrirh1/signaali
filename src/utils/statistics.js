import * as _ from 'underscore';

const getStatistics = (data, val1, val2) => {
	const prop1 = _.pluck(data, val1);
	const prop2 = _.pluck(data, val2);
	const count = data.length > 90 ? '90+' : data.length;

	const mostCommonProp1 = _.chain(prop1)
		.countBy()
		.pairs()
		.max(_.last)
		.head()
		.value();

	const mostCommonProp2 = _.chain(prop2)
		.countBy()
		.pairs()
		.max(_.last)
		.head()
		.value();

	return [mostCommonProp1, mostCommonProp2, count];
};

export default getStatistics;
