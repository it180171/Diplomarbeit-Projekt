import CAccordion, { SAccordion } from './CAccordion';
import { Package, Description } from '../models/Models';
import { Tooltip } from '@mui/material';

/**
 * 
 * @param {{packages: Package[], descriptions: Description[]}} param0
 * @returns 
 */
const InstallablePackages = ({ packages, descriptions }) => {
    return (
        <div>
            <CAccordion
                expanded={true}
                summary='Installable Packages'
                detail={
                    <>
                        {packages.map(p =>
                            <InstallablePackage key={p.id} instPackage={p} descriptions={descriptions.filter(d => d.packageId === p.id)} />
                        )}
                    </>
                } />
        </div>
    )
}



/**
 * 
 * @param {{instPackage: Package, descriptions: Description[]}} param0 
 * @returns 
 */
const InstallablePackage = ({ instPackage, descriptions }) => {
    return (
        <div>
            <SAccordion
                expanded={true}
                summary={instPackage.name}
                detail={
                    <div className='packageContent'>
                        <p><span><span>ID</span><span>:</span></span><span>{instPackage.id}</span></p>
                        <p className={instPackage.changes.name}><span><span>name</span><span>:</span></span><span>{instPackage.name}</span></p>
                        <p className={instPackage.changes.contextMenuApplicationName}><span><span>Context menu application name</span><span>:</span></span><span>{instPackage.contextMenuApplicationName}</span></p>
                        <p className={instPackage.changes.description}><span><span>Description</span><span>:</span></span><span>{instPackage.description}</span></p>
                        <p className={instPackage.changes.iconUrl}><span><span>Icon URL</span><span>:</span></span><span>{instPackage.iconUrl}</span></p>
                        <p className={instPackage.changes.startPath}><span><span>Start path</span><span>:</span></span><span>{instPackage.startPath}</span></p>
                        <p className={instPackage.changes.startArguments}><span><span>Start Arguments</span><span>:</span></span><span>{instPackage.startArguments}</span></p>
                        <p className={instPackage.changes.releaseNotes}><span><span>Realease notes</span><span>:</span></span><span>{instPackage.releaseNotes}</span></p>
                        <p className={instPackage.changes.sortOrder}><span><span>Sort order</span><span>:</span></span><span>{instPackage.sortOrder}</span></p>
                        <div className={instPackage.changes.installableIds}><span><span>Installable IDs</span><span>:</span></span><div>{instPackage.installableIds.map((id, i) => <span key={id} >{id} {i < instPackage.installableIds.length - 1 && ','} </span>)}</div></div>
                        {descriptions.length > 0 &&
                            <div>
                                {/* <SAccordion
                                    expanded={true}
                                    icon={false}
                                    summary='Descriptions:'
                                    detail={ */}
                                <p>Descriptions:</p>
                                <div>
                                    {
                                        descriptions.map((d, i) =>
                                            <div className={d.changes[i]} key={d.id}>
                                                <p>{d.cultureCode}:</p>
                                                <p>{d.description}</p>
                                            </div>

                                        )
                                    }
                                </div>
                                {/* }
                                /> */}
                            </div>
                        }

                    </div>
                }
            />
        </div>
    )
}

export default InstallablePackages