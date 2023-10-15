import { useParamsNavigator } from '../../hooks/useNavigator';
import { IPlanetData } from '../../types/PlanetsData';
import { parseDetailNumber } from '../../utils/parseDetailNumber';

import styles from './PlanetItem.module.css';

interface IPlanetItemProps {
  planet: IPlanetData;
}

export function PlanetItem({ planet }: IPlanetItemProps) {
  const navigate = useParamsNavigator();

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    const number = parseDetailNumber(planet.url);
    navigate('details', null, null, number);
  };

  return (
    <div className={styles.planet} onClick={onClickHandler}>
      <h3 className={styles.planet__heading}>{planet.name}</h3>
    </div>
  );
}
