import React from 'react';
// import { Link } from 'gatsby';
import moment from 'moment';
import numeral from 'numeral';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faClock, faTags } from '@fortawesome/free-solid-svg-icons';

import { LookupCategoryDisplayName } from '../../utils/process-categories';
import './expand-collapse.css';
import './styles.css';


library.add(faMoneyBillWave, faClock, faTags);

const formatCurrency = number => numeral(number).format('($0a)');

const JobDetails = ({
  job_category_ids: jobCategoryIds,
  posting_date: postingDate,
  salary_range_from: salaryRangeFrom,
  salary_range_to: salaryRangeTo,
  salary_frequency: salaryFrequency,
}) => {
  const dateString = moment(postingDate).fromNow();


  const jobCategories = jobCategoryIds.map((id) => {
    const displayName = LookupCategoryDisplayName(id);
    return (
      <small key={id}><a href={`/category/${id}`}><span className="badge badge-secondary">{displayName}</span></a></small>
    );
  });

  return (
    <ul>
      <li>
        <FontAwesomeIcon icon="clock" />
        <small>{dateString}</small>
      </li>
      <li>
        <FontAwesomeIcon icon="money-bill-wave" />
        <small>
          {formatCurrency(salaryRangeFrom)}
          {' '}
-
          {' '}
          {formatCurrency(salaryRangeTo)}
          {' '}
(
          {salaryFrequency}
)
        </small>
      </li>
      <li>
        <FontAwesomeIcon icon="tags" />
        {jobCategories}
      </li>
    </ul>
  );
};

export default JobDetails;