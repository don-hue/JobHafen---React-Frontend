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
import { Button } from '@primereact/ui/button';
import {
    CheckCircle, 
    Trash
} from '@primeicons/react';
type SearchTableRow ={
    searchId: number;
    keyword: string;
    postal_code: string; 
    radius: string;
    disableDeleteButton: boolean
}

export default function Search() {
    const [searches, setSearch] = React.useState<SearchTableRow[]>([
        {
            searchId: 1,
            keyword: "Java",
            postal_code:"41063", 
            radius:"15",
            disableDeleteButton: false,  
        },
    ]);



    return (
        <div className="w-full">
            <DataTable.Root data={searches}>
                <DataTable.TableContainer>
                    <DataTable.Table style={{ minWidth: '50rem' }}>
                        <DataTable.THead>
                            <DataTable.THeadRow>
                                <DataTable.THeadCell>
                                    <DataTable.THeadTitle>Suchaufträge</DataTable.THeadTitle>
                                </DataTable.THeadCell>
                            </DataTable.THeadRow>
                        </DataTable.THead>
                        <DataTable.TBody>
                            {({ item }) => {
                                const search = item as SearchTableRow;
                                return (
                                    <DataTable.Row key={search.searchId}>
                                        <DataTable.Cell>
                                           <div className="search-cell">
                                                <Button 
                                                className="checked-cell"
                                                severity="danger" 
                                             
                                                // (click)="deleteSearch(search)" 
                                                // [disabled] = "search.disableDeleteButton"
                                                >
                                                    <Trash/>
                                                </Button>


                                                <div style={{gap: "1.5rem"}}>
                                                    <div className="search-info">
                                                        <span className="search-keyword">
                                                            { search.keyword } 
                                                        </span>

                                                        <span className="search-badge">
                                                            { search.postal_code }
                                                        </span>

                                                        <span className="search-badge">
                                                            { search.radius } km
                                                        </span>
                                                    </div>
                                            
                                                    <div className="search-portals">
                                                        <span>Portale:</span>
                                                        <span>StepStone |</span>
                                                        <span>Commerzbank |</span>
                                                        <span>Finanz Informatik</span>
                                                    </div>
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
