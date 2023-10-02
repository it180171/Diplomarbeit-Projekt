import CAccordion, { SAccordion } from './CAccordion';
import { Installable, ExecutablePath, SyncTemplate, SyncPath } from "../models/Models"

/**
 * 
 * @param {{installables: Installable[], executablePaths: ExecutablePath[], syncTemplates: SyncTemplate[]}} param0 
 * @returns 
 */
const Installables = ({ installables, executablePaths, syncTemplates }) => {
    return (
        <CAccordion
            expanded={true}
            summary='Installables'
            detail={
                <>
                    {installables.map(i =>
                        <InstallableC key={i.id}
                            installable={i}
                            exePath={executablePaths.find(e => e.installableId === i.id)}
                            syncTemp={syncTemplates.find(s => s.installableId === i.id)} />)}
                </>
            }
        />
    )
}

/**
 * 
 * @param {{installable: Installable, exePath: ExecutablePath, syncTemp: SyncTemplate}} param0 
 */
const InstallableC = ({ installable, exePath, syncTemp }) => {
    return (
        <SAccordion
            expanded={true}
            summary={installable.name}
            detail={
                <div className='packageContent'>
                    <p><span><span>ID</span><span>:</span></span><span>{installable.id}</span></p>
                    <p><span><span>Name</span><span>:</span></span><span>{installable.name}</span></p>
                    {exePath &&
                        <>
                            <p><span><span>Executable Path ID</span><span>:</span></span><span>{exePath.id}</span></p>
                            <p><span><span>Application Name</span><span>:</span></span><span>{exePath.applicationName}</span></p>
                            <p><span><span>Executable Path</span><span>:</span></span><span>{exePath.executablePath}</span></p>
                            <p><span><span>Icon Path</span><span>:</span></span><span>{exePath.iconPath}</span></p>
                        </>
                    }
                    {syncTemp &&
                        <>
                            <p><span><span>Sync Template ID</span><span>:</span></span><span>{syncTemp.id}</span></p>
                            {(syncTemp.addPaths.length > 0 )&& <Paths title={'Add Paths'} paths={syncTemp.addPaths} />}
                            {(syncTemp.ignorePaths.length > 0) && <Paths title={'Ignore Paths'} paths={syncTemp.ignorePaths} />}
                        </>
                    }
                </div>
            }
        />
    )
}


/**
 * 
 * @param {{paths: SyncPath[]}} param0 
 */
const Paths = ({ title, paths }) => {
    return (
        <div>
            <p>{title}:</p>
            <div>
                {paths.map((p, index) => <Path key={index} path={p} />)}
            </div>
        </div>
    )
}

/**
 * 
 * @param {{path: SyncPath}} param0 
 */
const Path = ({ path }) => {
    return (
        <div>
            <p><span><span>Destination</span><span>:</span></span><span>{path.destination}</span></p>
            <p><span><span>Is Folder</span><span>:</span></span><span>{path.isFolder ? 'true' : 'false'}</span></p>
        </div>
    )
}


export default Installables