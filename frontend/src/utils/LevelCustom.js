import {useTranslation} from 'react-i18next';
import './LevelCustom.scss';
import {PRIMARY_STATISTICS_CUSTOM, STATISTIC_DEFINITIONS_CUSTOM} from '../constants/commonConstants'
import {capitalizeCustom, formatNumberCustom} from '../utils/commonFunctions'
  


function PureLevelItemCustom({statistic, total, delta}) {
  const {t} = useTranslation();

 
  const statisticConfig = STATISTIC_DEFINITIONS_CUSTOM[statistic];

  return (
    <>
      <h5>{t(capitalizeCustom(statisticConfig.displayName))}</h5>
      <h4>
        {(delta > 0 ? (
                `+${formatNumberCustom(delta, statisticConfig.format, statistic)}`
          ) : (
            0
          )
        )}
      </h4>
      <h1>
        {
          formatNumberCustom(total, statisticConfig.format, statistic)
        }
      </h1>
    </>
  );
}

const LevelItemCustom = PureLevelItemCustom;

function LevelCustom({data}) {
  return (
    <div className="Level">
      {PRIMARY_STATISTICS_CUSTOM.map((statistic, index) => (
        <div
          key={index}
          className={`level-item is-${statistic}`}
        >
          <LevelItemCustom
            {...{statistic}}
            total={data.total[statistic]}
            delta={data.delta[statistic]}
            />
        </div>
      ))}
    </div>
  );
}

export default LevelCustom;
