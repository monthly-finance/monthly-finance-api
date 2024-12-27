import { BulkOperationOutput } from './dto/common.dto';

export const evaluateSettledPromises = (
  settledPromiseList: PromiseSettledResult<any>[],
): BulkOperationOutput => {
  const errors = [];
  const successful = [];
  settledPromiseList.forEach((result) => {
    if (result.status === 'rejected') errors.push(result.reason);
    else successful.push(result.value);
  });

  return { successful, errors };
};
