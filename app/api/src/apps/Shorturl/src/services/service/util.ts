// import { EntityManager } from 'sequelize';
import { addDays } from 'date-fns';
import {
  Dependencies,
  injectDependencies,
} from '../../../../../util/dependencyInjector';

import ShortUrl from '../Entity/shortUrl';
import { EntityManager } from 'typeorm';
import config from '../../../../../Config/config';
import { I18nContext, I18nService } from 'nestjs-i18n';

async function createRoleLink(
  queueGroupId: string,
  queueId: string,
  QRId: string,
  customerId: string,
  queueCustomerId: string,
  dependencies: Dependencies = null,
): Promise<string> {
  dependencies = injectDependencies(dependencies, []);
  const prefix =
    process.env.NODE_ENV === 'production'
      ? `${config.roleUrl}/#/s/`
      : 'http://localhost:8080/#/s/';
  const longUrlComponent = `/c/${encodeURIComponent(
    queueGroupId,
  )}/${encodeURIComponent(queueId)}/${encodeURIComponent(
    QRId,
  )}/?cid=${encodeURIComponent(customerId)}&qcid=${encodeURIComponent(
    queueCustomerId,
  )}`;
  const shortUrlComponent = await ShortUrl.create(
    null,
    longUrlComponent,
    addDays(Date.now(), 1),
    dependencies,
  );
  console.log(prefix + encodeURIComponent(shortUrlComponent));
  return prefix + encodeURIComponent(shortUrlComponent);
}

export default {
  createRoleLink,
};
