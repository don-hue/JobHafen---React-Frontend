'use client';
import { Database } from '@primeicons/react/database';
import { Star } from '@primeicons/react/star';
import { StarFill } from '@primeicons/react/star-fill';
import { DataTable } from '@primereact/ui/datatable';
import { Rating } from '@primereact/ui/rating';
import { Tag } from '@primereact/ui/tag';
import * as React from 'react';
import { ToggleSwitchRootChangeEvent } from '@primereact/ui/toggleswitch';
import { ToggleSwitch } from '@primereact/ui/toggleswitch';
import {
    CheckCircle
} from '@primeicons/react';
type JobTableRow = {
    id: number;
    jobTitle: string;
    applied: boolean;
    companyName: string;
    companyHomepage?: String;
    toogleDisable: boolean;
}

export default function Home() {
    const [jobs, setJobs] = React.useState<JobTableRow[]>([
        {
            id: 1,
            jobTitle: 'Java Entwickler (m/w/d)',
            applied: true,
            companyName: 'DeineTraumFirma GmbH',
            companyHomepage: undefined,
            toogleDisable: false,
        },
        {
            id: 2,
            jobTitle: 'Full Stack Developer (m/w/d)',
            applied: false,
            companyName: 'DeineTraumFirma GmbH',
            companyHomepage: undefined,
            toogleDisable: false,
        },
    ]);

    const toggleApplied = (jobId: number, checked: boolean) => {
        setJobs(prevJobs => 
            prevJobs.map(job => 
                job.id == jobId
                    ? {...job, applied: checked}
                    : job
            )
        );
    }


    return (
        <div className="w-full">
            <DataTable.Root data={jobs}>
                <DataTable.TableContainer>
                    <DataTable.Table style={{ minWidth: '50rem' }}>
                        <DataTable.THead>
                            <DataTable.THeadRow>
                                <DataTable.THeadCell>
                                    <DataTable.THeadTitle>Jobs</DataTable.THeadTitle>
                                </DataTable.THeadCell>
                            </DataTable.THeadRow>
                        </DataTable.THead>
                        <DataTable.TBody>
                            {({ item }) => {
                                const job = item as JobTableRow;
                                return (
                                    <DataTable.Row key={job.id}>
                                        <DataTable.Cell>
                                            <div className="job-cell" id="job.id">
                                                <div className = {`checked-cell ${!job.applied ? 'hidden' : ''}`}>
                                                   <CheckCircle/>
                                                </div>
                                                <div className="job-info">
                                                    <span className="search-keyword">{ job.jobTitle }</span>
                                                    <span className="search-portals">{ job.companyName}</span>
                                                </div>
                                                <div className="toggle-cell">
                                                    <ToggleSwitch.Root inputId="mode" checked={job.applied} onCheckedChange={(event: ToggleSwitchRootChangeEvent) => toggleApplied(job.id,event.checked)}>
                                                        <ToggleSwitch.Control>
                                                            <ToggleSwitch.Handle />
                                                        </ToggleSwitch.Control>
                                                    </ToggleSwitch.Root>
                                                    <label htmlFor="mode">beworben</label>
                                                </div>
                                            </div>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                );
                            }}
                        </DataTable.TBody>
                    </DataTable.Table>
                </DataTable.TableContainer>
            </DataTable.Root>
        </div>
    );
}
