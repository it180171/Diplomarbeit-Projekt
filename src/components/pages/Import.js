import { Outlet } from "react-router";
import ImportConfig from "../components/import/ImportConfig";
import Dropzone from 'react-dropzone';
import { useCallback, useEffect, useRef, useState } from 'react';
import '../style/import.css';
import { Button } from "@mui/material";
import { useBetween } from 'use-between';
import { useQuery } from "react-query";
import { fetchExportData } from '../components/ExportData';
import LoadingProgress from '../components/LoadingProgress';
import { AlertSnackbars } from '../components/ExportData';
import { BiRightArrow } from "react-icons/bi";
import { Config } from "../components/models/Models";

const useSharableUploadContent = () => {
    const [uploadContent, setUploadContent] = useState(null);
    return {
        uploadContent, setUploadContent
    };
}

const useSharableError = () => {
    const [error, setError] = useState(null);
    return {
        error, setError
    };
}

const Import = () => {
    const [showDnD, setShowDnD] = useState(true);
    const { uploadContent, setUploadContent } = useBetween(useSharableUploadContent);
    const { error, setError } = useBetween(useSharableError);
    return (
        <div className="box importContainer">
            {showDnD ? <DnD setShowDnD={setShowDnD} />
                : <ConfigC />}
            {error}
            <Outlet />
        </div>
    )
};

const DnD = ({ setShowDnD }) => {
    const [yo, setYo] = useState(true);
    const [dndText, setDndText] = useState('Drag n drop some files here, or click to select files');
    const { uploadContent, setUploadContent } = useBetween(useSharableUploadContent);
    const { error, setError } = useBetween(useSharableError);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onerror = () => {
                setError(<AlertSnackbars type='error' text={'Something went wrong, please try again.'} />);
            }
            reader.onload = async () => {
                setYo(false);
                setDndText('Imported File: ' + file.name);
                // await setUploadContent(reader.result);

                if (reader.result === null || reader.result.lenght <= 2) {
                    setError(<AlertSnackbars type='error' text={'Then content of the uploaded file is either empty or to short.'} />);
                    return;
                }
                setUploadContent(JSON.parse(reader.result));
                setShowDnD(false);
            }
            reader.readAsText(file)
        });

    }, []);

    const yoo = () => {
        if (uploadContent === null || uploadContent.lenght <= 2) {
            setError(<AlertSnackbars type='error' text={'Then content of the uploaded file is either empty or to short.'} />);
            return;
        }
        setUploadContent(JSON.parse(uploadContent));
        setShowDnD(false);
    }

    return (
        <Dropzone multiple={false} accept={{ 'application/json': ['.json'] }} onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div>
                        <div className="dndBox" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>{dndText}</p>
                        </div>
                        {/* <div className="dnbBtnBox">
                            <Button variant="contained" onClick={yoo} disabled={yo}>Next</Button>
                        </div> */}
                    </div>
                </section>
            )}
        </Dropzone>);
}

const ConfigC = ({ }) => {
    const { uploadContent, setUploadContent } = useBetween(useSharableUploadContent);
    let { data, status } = useQuery('config', fetchExportData);
    const [uploadDiff, setUploadDiff] = useState(null);
    const [currentDiff, setCurrentDiff] = useState(null);

    // console.log(uploadContent);
    if (status === 'loading') {
        return <div className='loadingBox'><LoadingProgress /></div>
    }
    if (status === 'error' || data.status != 200 || data === null) {
        return <AlertSnackbars type='error' text={'Something went wrong, please try it later again.'} />
    }

    data = data.data;

    // let ccd = data;
    // let ncd = uploadContent;

    // cc.packages[0].description = null;
    // return;
    // console.log(nc);

    // let yooo = {};
    // nc.packages.forEach((p, i) => {
    //     let cp = cc.packages.find(pp => pp.id = p.id);
    //     let yoo = {};

    //     if (cp === null) {
    //         yooo[i] = 'deleted';
    //         return;
    //     }

    //     for (let [k, v] of Object.entries(p)) {
    //         // console.log(v);
    //         // console.log(cp[k]);
    //         // // console.log(v === null && cp[k] !== null)
    //         // console.log('_______________________')

    //         if (cp[k] === null && v !== null) {
    //             yoo[k] = 'added';
    //             continue;
    //         }
    //         if (v === null && cp[k] !== null) {
    //             yoo[k] = 'deleted';
    //             continue;
    //         }
    //         if (JSON.stringify(v) !== JSON.stringify(cp[k])) {
    //             yoo[k] = 'changed';
    //             continue;
    //         }

    //         console.log('***********************')
    //     }
    //     n.packages[i] = { ...n.packages[i], yo: yoo };
    //     console.log(yoo);
    // });
    // n.packages['yo'] = { ...n.packages['yo'], yooo };

    // let yoooo = {};
    // for (let [ek, ev] of Object.entries(nc)) {
    //     let ce = cc[ek];
    //     let yooo = {};
    //     if (ce === null) {
    //         yooo[ek] = 'added';
    //         return;
    //     }

    //     ev.forEach((p, i) => {
    //         let cp = cc[ek].find(pp => pp.id = p.id);
    //         let yoo = {};

    //         if (cp === null) {
    //             yooo[i] = 'added';
    //             return;
    //         }

    //         for (let [k, v] of Object.entries(p)) {
    //             // console.log(v);
    //             // console.log(cp[k]);
    //             // console.log('_______________________')

    //             if (cp[k] === null && v !== null) {
    //                 yoo[k] = 'added';
    //                 continue;
    //             }
    //             if (v === null && cp[k] !== null) {
    //                 yoo[k] = 'deleted';
    //                 continue;
    //             }
    //             if (JSON.stringify(v) !== JSON.stringify(cp[k])) {
    //                 yoo[k] = 'changed';
    //                 continue;
    //             }

    //             // console.log('***********************')
    //         }
    //         // n[ek][i] = { ...n[ek][i], yo: yoo };
    //         n[ek][i]['yo'] = yoo;
    //         // console.log(yoo);
    //     });
    //     n[ek]['yo'] = { ...n[ek]['yo'], yooo };
    // }
    // n['yo'] = { ...n['yo'], yoooo };
    // console.log(n);

    // compare(dataRef, uploadRef);
    /**
     * 
     * @param {Config} cc
     * @param {Config} nc
     */
    const Compare = (() => {
        let cc = data;
        let nc = uploadContent;

        let n = { ...nc }
        let c = { ...cc };

        if (uploadDiff === null || uploadDiff === undefined) {
            let yoooo = {};
            for (let [ek, ev] of Object.entries(nc)) {
                let ce = cc[ek];
                let yooo = {};
                if (ce === null) {
                    yooo[ek] = 'added';
                    return;
                }

                // console.log(ev);
                ev.forEach((p, i) => {
                    let cp;
                    if (ek === 'descriptions') {
                        cp = cc[ek].find(pp => (pp.id === p.id && pp.packageId === p.packageId));
                    } else {
                        cp = cc[ek].find(pp => pp.id === p.id);
                    }
                    let yoo = {};

                    if (cp === null) {
                        yooo[i] = 'added';
                        return;
                    }

                    for (let [k, v] of Object.entries(p)) {
                        // console.log(v);
                        // console.log(cp[k]);
                        // console.log('_______________________')

                        if (cp[k] === null && v !== null) {
                            yoo[k] = 'added';
                            continue;
                        }
                        if (v === null && cp[k] !== null) {
                            yoo[k] = 'deleted';
                            continue;
                        }
                        if (JSON.stringify(v) !== JSON.stringify(cp[k])) {
                            yoo[k] = 'changed';
                            continue;
                        }

                        yoo[k] = '';
                        // console.log('***********************')
                    }
                    // n[ek][i] = { ...n[ek][i], yo: yoo };
                    n[ek][i]['changes'] = yoo;
                    // console.log(yoo);
                });
                n[ek]['changes'] = { ...n[ek]['changes'], yooo };
            }
            n['changes'] = { ...n['changes'], yoooo };
            setUploadDiff(n);
        }

        // console.log(n);
        // console.log(nc);

        return (
            <>{null}</>
        )
    });

    return (
        <div className="importConfigBox">
            <Compare setUploadDiff={setUploadDiff} />
            <div className="configContainer">
                <h1>Import</h1>
                <div className="configsBox">
                    {/* <ImportConfig title='Current Config'
                        data={data.data} /> */}
                    <ImportConfig title='New Config'
                        data={uploadDiff} />
                </div>
            </div>

            <div className="statsBtns">
                <Statistics stats={
                    [{ type: 'added', msg: 'yooooooooo' }, { type: 'removed', msg: 'yooooooooo' }, { type: 'changed', msg: 'yooooooooo' }]
                } />
                <div className="importBtnBox">
                    <Button variant="contained">Back to DnD</Button>
                    <Button variant="contained">Export new config</Button>
                    <Button variant="contained">Import</Button>
                </div>
            </div>
        </div>
    )
}

/**
 * 
 * @param {{stats: [{type: string, msg: string}]}} param0 
 * @returns 
 */
const Statistics = ({ stats }) => {

    /**
     * 
     * @param {{stat: {type: string, msg: string}}} param0 
     * @returns 
     */
    const Statistic = ({ stat }) => {
        const { type, msg } = stat;
        return (
            <div>
                <BiRightArrow className={type} />
                <p>{msg}</p>
            </div>
        )
    }

    return (
        <div className="stats">
            {stats.map((s, i) => <Statistic key={i} stat={s} />)}
        </div>
    )
}

export default Import;