import InstallablePackages from './InstallablePackages';
import { Config } from '../models/Models';
import Installables from './Installables';
import LoadingProgress from '../LoadingProgress';

/**
 * 
 * @param {{data: Config}} param0 
 * @returns 
 */
const ImportConfig = ({ title, data }) => {
  console.log(data);

  if (data === null) {
    return <div className='loadingBox'><LoadingProgress /></div>
  }

  return (
    <div className='configBox'>
      <h1>{title}</h1>
      <InstallablePackages packages={data.packages} descriptions={data.descriptions} />
      <Installables
        installables={data.installables}
        executablePaths={data.executablePaths}
        syncTemplates={data.syncTemplates} />
    </div>
  )
}

export default ImportConfig