'use client';
import { DataTable } from '@primereact/ui/datatable';
import * as React from 'react';
import { Button } from '@primereact/ui/button';
import { ProgressSpinner } from '@primereact/ui/progressspinner';
import {Trash, Replay, PlusCircle} from '@primeicons/react';
import { searchService } from './service';
import { toast } from '@primereact/ui/toaster';
import { Times } from '@primeicons/react/times';
import { Dialog } from '@primereact/ui/dialog';
import { InputText } from '@primereact/ui/inputtext';
import { Label } from '@primereact/ui/label';

type SearchTableRow ={
    searchId: number;
    keyword: string;
    postal_code: string; 
    radius: string;
    disableDeleteButton: boolean
}

export default function Search() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState<boolean>(false)
    const [jobTitle, setJobTitle] = React.useState<string>("");
    const [plz, setPlz] = React.useState<string>("");
    const [radius, setRadius] = React.useState<string>("");   
    const [searches, setSearch] = React.useState<SearchTableRow[]>([
        {
            searchId: 1,
            keyword: "Java",
            postal_code:"41063", 
            radius:"15",
            disableDeleteButton: false,  
        },
    ]);

    

    const updateSearch =  async () => {
        setIsLoading(true);
        try{
            const res = await searchService
            .getAllSearches();

            const newSearches = res.filter((search) => 
                !searches.some(existingSearch => existingSearch.searchId === search.id))
            .map((search) => ({
                    searchId: search.id,
                    keyword: search.keyword,
                    postal_code:search.postal_code, 
                    radius:search.radius,
                    disableDeleteButton: false,
            }));

            setSearch((currentSearches) => [
                ...currentSearches, 
                ...newSearches,
            ])
            toast.success({title: "Suchaufträge gefunden "})
            setIsLoading(false)
        } catch(err) {
            console.log(err);
            toast.error({title: "Ein Fehler ist eingetreten"})
            setIsLoading(false)
        };
        
    }

    const saveSearch = (event: React.FormEvent<HTMLFormElement>) => {
         event.preventDefault();
         setIsSaving(true)
         

        setJobTitle("");
        setPlz("");
        setRadius("");
        setIsSaving(false)
        console.log()
    }


    const emptyDialog = () => {
        setJobTitle("");
        setPlz("");
        setRadius("");
        setIsSaving(false);
    }


    return (
        <div className="w-full">
            <DataTable.Root data={searches}>
                <DataTable.TableContainer>
                    <DataTable.Table style={{ minWidth: '50rem' }}>
                        <DataTable.THead>
                            <DataTable.THeadRow>
                                <DataTable.THeadCell>
                                    <DataTable.THeadTitle>
                                        Suchaufträge
                                        <Button style={{marginLeft:"0.5rem"}}
                                        onClick ={updateSearch}                             
                                        >
                                            {isLoading ? (
                                                <ProgressSpinner.Root aria-label="Loading" style={{width:"1rem", height:"1rem"}}>
                                                    <ProgressSpinner.Track />
                                                    <ProgressSpinner.Range />
                                                </ProgressSpinner.Root>  
                                            ) : (
                                                <Replay/>
                                            )
                                        }
                                        </Button>
                                        </DataTable.THeadTitle>
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
                                                className="delete-cell "
                                                severity="danger" 
                                                disabled = {search.disableDeleteButton}
                                                // (click)="deleteSearch(search)"                               
                                                >
                                                    <Trash/>
                                                </Button>
                                                <div className='hovered'>
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
            <div className="flex"  style={{paddingTop: "1rem",paddingLeft: "1rem"}}>
            <Dialog.Root open={isOpen}>
                <Dialog.Trigger as={Button} onClick={() => setIsOpen(true)}>
                    <PlusCircle/> 
                    Suche anlegen
                     
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Popup style={{ width: '24rem' }}>
                            <Dialog.Header>
                                <Dialog.Title>Edit Profile</Dialog.Title>
                                <Dialog.HeaderActions>
                                    <Dialog.Close as={Button} pt-root-onClick={emptyDialog} rounded variant="text" iconOnly>
                                        <Times />
                                    </Dialog.Close>
                                </Dialog.HeaderActions>
                            </Dialog.Header>
                            <form onSubmit={saveSearch}>
                            <Dialog.Content>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <Label htmlFor="jobTitle">Jobtitel</Label>
                                        <InputText 
                                        value={jobTitle}
                                        invalid={!/^.+$/.test(jobTitle)}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobTitle(e.target.value)}
                                        id="td_jobTitle" 
                                        name="jobTitle" 
                                        placeholder="Software Entwickler" 
                                        data-autofocus  />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <Label htmlFor="postalCode">Postleitzahl</Label>
                                        <InputText 
                                        invalid={!/^\d{5}$/.test(plz)}
                                        value={plz}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlz(e.target.value)}
                                        id="td_plz" 
                                        name="plz" 
                                        placeholder="50000" />
                                    </div>
                                     <div className="flex flex-col gap-1.5">
                                        <Label htmlFor="radius">Radius in KM</Label>
                                        <InputText 
                                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadius(e.target.value)}
                                        invalid={!/^\d+$/.test(radius)}
                                        value={radius}
                                        id="td_radius" 
                                        name="radius" 
                                        placeholder="15"/>
                                    </div>
                                </div>
                            </Dialog.Content>
                            <Dialog.Footer>
                                <Dialog.Close as={Button} type="button" pt-root-onClick={emptyDialog} severity="secondary" variant="outlined">Cancel</Dialog.Close>
                                    {isSaving ? (
                                         <Button style={{marginLeft:"0.5rem"}}>
                                        <ProgressSpinner.Root aria-label="Loading" style={{width:"1rem", height:"1rem"}}>
                                            <ProgressSpinner.Track />
                                            <ProgressSpinner.Range />
                                        </ProgressSpinner.Root>  
                                        </Button>
                                    ) : (
                                        <Dialog.Close as={Button} onClick={saveSearch} type="submit">Save</Dialog.Close>
                                    )
                                    }
                            </Dialog.Footer>
                            </form>
                        </Dialog.Popup>
                    </Dialog.Positioner>
                </Dialog.Portal>
            </Dialog.Root>
        </div>

        </div>
    );
}
