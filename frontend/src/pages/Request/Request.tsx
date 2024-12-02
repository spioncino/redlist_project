import { useState } from 'react';
import { RequestInfo } from '../../components/ui/RequestInfo/RequestInfo';
import css from './Request.module.css';
import { HelperMonitoringAdmPage, Paginate } from '../../components';
import { ArrowDown } from '../../assets';
import { motion } from 'framer-motion';

const Request = () => {
  const [showProcRequest, setShowProcRequest] = useState<boolean>(false);

  const [pageTypes, setPageTypes] = useState<number>(0);
  const [pageHistory, setPageHistory] = useState<number>(0);

  return (
    <div className={css.mainContainer}>
      <HelperMonitoringAdmPage />
      <div className={css.activeRequestContainer}>
        <h5 className={css.titleH5}>Новые заявки</h5>
        <div className={css.activeRequestContent}>
          <ul className={css.activeRequestNav}>
            <li className={css.numRequest}>Номер заявки</li>
            <li className={css.dateRequest}>Дата</li>
            <li className={css.animRequest}>Животное</li>
            <li>Автор</li>
          </ul>
        </div>
        <RequestInfo active={true} users={true} />
      </div>
      <div className={css.procRequestContainer}>
        <button
          className={css.titleH5}
          onClick={() => setShowProcRequest(!showProcRequest)}
          type="button"
        >
          Рассмотренные заявки{' '}
          <motion.span
            className={css.pointerArrow}
            animate={{
              rotate: showProcRequest ? 180 : 0,
            }}
            initial={false}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ArrowDown />
          </motion.span>
        </button>
        <div className={showProcRequest ? css.procRequestContent : 'none'}>
          <RequestInfo active={false} />
          <Paginate
            totalPages={1}
            nowPage={(page) => {
              setPageHistory(page);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Request;
