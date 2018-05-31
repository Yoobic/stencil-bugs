import { Injectable } from '@angular/core';
import { Security as SecurityBase, User, Location, LocationType, MissionDescription } from '@shared/data-core';

import { Geofilter } from '../../interfaces/geofilter/geofilter.interface';
import { Campaignfilter } from '../../interfaces/campaignfilter/campaignfilter.interface';

import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { uniq, uniqBy, union, differenceBy } from 'lodash-es';

@Injectable()
export class Security extends SecurityBase {

    /**
     Add a new geofilter
     */
    addGeofilter(geofilter: Geofilter): Observable<any> {
        return this.broker.getAll('geofilters', null, null, null, this.getGeofilterFilter(geofilter.user ? geofilter.user._id : geofilter.userRef)).pipe(map(res => {
            return res && res.data && res.data.length > 0 ? res.data[0] : null;
        })).pipe(mergeMap((existing: Geofilter) => {
            if (existing) {
                geofilter._id = existing._id;
                if (existing.locations && existing.locations.length > 0) {
                    geofilter.locations = geofilter.locations || [];
                    geofilter.locations = uniqBy(union(geofilter.locations, existing.locations), l => l._id);
                }
                if (existing.locationtypes && existing.locationtypes.length > 0) {
                    geofilter.locationtypes = geofilter.locationtypes || [];
                    geofilter.locationtypes = uniqBy(union(geofilter.locationtypes, existing.locationtypes), l => l._id);
                }
            }
            return this.broker.upsert('geofilters', geofilter);
        }));
    }

    /**
    Remove the specified  geofilter
    */
    removeGeofilter(user: User) {
        return this.broker.getAll('geofilters', null, null, null, this.getGeofilterFilter(user._id)).pipe(map(res => {
            return res && res.data && res.data.length > 0 ? res.data[0] : null;
        })).pipe(mergeMap((geofilter: Geofilter) => {
            if (geofilter) {
                return this.broker.delete('geofilters', geofilter._id);
            } else {
                return of(null);
            }
        }));
    }

    /**
    Add the specified locations to the user geofilter
    */
    addGeofilterLocations(user: User, locations: Array<Location>) {
        return this.broker.getAll('geofilters', null, null, null, this.getGeofilterFilter(user._id)).pipe(map(res => {
            return res && res.data && res.data.length > 0 ? res.data[0] : null;
        })).pipe(mergeMap((geofilter: Geofilter) => {
            if (geofilter) {
                geofilter.locations = uniqBy(union(geofilter.locations, locations), l => l._id);
                geofilter.locationsRef = geofilter.locations.map(l => l._id);
                return this.broker.upsert('geofilters', geofilter);
            } else {
                return of(null);
            }
        }));
    }

    /**
    Remove the specified locations to the user geofilter
    */
    removeGeofilterLocations(user: User, locations: Array<Location>) {
        return this.broker.getAll('geofilters', null, null, null, this.getGeofilterFilter(user._id)).pipe(map(res => {
            return res && res.data && res.data.length > 0 ? res.data[0] : null;
        })).pipe(mergeMap((geofilter: Geofilter) => {
            if (geofilter) {
                geofilter.locations = uniqBy(differenceBy(geofilter.locations, locations, (l: any) => l._id), (l: any) => l._id);
                geofilter.locationsRef = geofilter.locations.map(l => l._id);
                return this.broker.upsert('geofilters', geofilter);
            } else {
                return of(null);
            }
        }));
    }

    /**
    Add the specified locationtypes to the user geofilter
    */
    addGeofilterLocationTypes(user: User, locationtypes: Array<LocationType>) {
        return this.broker.getAll('geofilters', null, null, null, this.getGeofilterFilter(user._id)).pipe(map(res => {
            return res && res.data && res.data.length > 0 ? res.data[0] : null;
        })).pipe(mergeMap((geofilter: Geofilter) => {
            if (geofilter) {
                geofilter.locationtypes = uniqBy(union(geofilter.locationtypes, locationtypes), l => l._id);
                geofilter.locationtypesRef = geofilter.locationtypes.map(l => l._id);
                return this.broker.upsert('geofilters', geofilter);
            } else {
                return of(null);
            }
        }));
    }

    /**
    Remove the specified locationtypes to the user geofilter
    */
    removeGeofilterLocationTypes(user: User, locationtypes: Array<LocationType>) {
        return this.broker.getAll('geofilters', null, null, null, this.getGeofilterFilter(user._id)).pipe(map(res => {
            return res && res.data && res.data.length > 0 ? res.data[0] : null;
        })).pipe(mergeMap((geofilter: Geofilter) => {
            if (geofilter) {
                geofilter.locationtypes = uniqBy(differenceBy(geofilter.locationtypes, locationtypes, (l: any) => l._id), (l: any) => l._id);
                geofilter.locationtypesRef = geofilter.locationtypes.map(l => l._id);
                return this.broker.upsert('geofilters', geofilter);
            } else {
                return of(null);
            }
        }));
    }

    /**
    Add a new campaignfilter
    */
    addCampaignfilter(campaignfilter: Campaignfilter) {
        return this.broker.getAll('geofilters', null, null, null, this.getGeofilterFilter(campaignfilter.user ? campaignfilter.user._id : campaignfilter.userRef)).pipe(map(res => {
            return res && res.data && res.data.length > 0 ? res.data[0] : null;
        })).pipe(mergeMap((existing: Campaignfilter) => {
            if (existing) {
                campaignfilter._id = existing._id;
                if (existing.campaigns && existing.campaigns.length > 0) {
                    campaignfilter.campaigns = campaignfilter.campaigns || [];
                    campaignfilter.campaigns = uniqBy(union(campaignfilter.campaigns, existing.campaigns), l => l._id);
                }
            }
            return this.broker.upsert('campaignfilters', campaignfilter);
        }));
    }

    /**
    Remove the specified  campaignfilter
    */
    removeCampaignfilter(user) {
        return this.broker.getAll('campaignfilters', null, null, null, this.getGeofilterFilter(user._id)).pipe(map(res => {
            return res && res.data && res.data.length > 0 ? res.data[0] : null;
        })).pipe(mergeMap((campaign: Campaignfilter) => {
            if (campaign) {
                return this.broker.delete('campaignfilters', campaign._id);
            } else {
                return of(null);
            }
        }));
    }

    /**
    Add the specified campaigns to the user campaignfilter
    */
    addCampaignfilterCampaigns(user: User, campaigns: Array<MissionDescription>) {
        return this.broker.getAll('campaignfilters', null, null, null, this.getCampaignfilterFilter(user._id)).pipe(map(res => {
            return res && res.data && res.data.length > 0 ? res.data[0] : null;
        })).pipe(mergeMap((campaignfilter: Campaignfilter) => {
            if (campaignfilter) {
                //campaignfilter.campaigns = uniqBy(union(campaignfilter.campaigns, campaigns), l => l._id);
                campaignfilter.campaignsRef = uniq(union(campaignfilter.campaignsRef, campaigns.map(c => c._id)));
                return this.broker.upsert('campaignfilters', campaignfilter);
            } else {
                return of(null);
            }
        }));
    }

    /**
    Remove the specified campaigns to the user campaignfilter
    */
    removeCampaignfilterCampaigns(user: User, campaigns: Array<MissionDescription>) {
        return this.broker.getAll('campaignfilters', null, null, null, this.getCampaignfilterFilter(user._id)).pipe(map(res => {
            return res && res.data && res.data.length > 0 ? res.data[0] : null;
        })).pipe(mergeMap((campaignfilter: Campaignfilter) => {
            if (campaignfilter) {
                campaignfilter.campaigns = uniqBy(differenceBy(campaignfilter.campaigns, campaigns, (l: any) => l._id), (l: any) => l._id);
                campaignfilter.campaignsRef = campaignfilter.campaigns.map(l => l._id);
                return this.broker.upsert('campaignfilters', campaignfilter);
            } else {
                return of(null);
            }
        }));
    }

    /**
    Returns the subquery used in the geofilter's tab user grid
    */
    getGeofilterSubQuery() {
        return { collectionName: 'geofilters', field: '_id', values: 'userRef' };
    }

    /**
       Returns the subquery used in the geofilter's tab user grid
       */
    getCampaignfilterSubQuery() {
        return { collectionName: 'campaignfilters', field: '_id', values: 'userRef' };
    }

    /**
    Returns the subquery used in the geofilter's tab location grid
    */
    getGeofilterLocationSubQuery(user) {
        return { collectionName: 'geofilters', where: { 'userRef': user._id }, field: '_id', values: 'locationsRef' };
    }

    /**
    Returns the subquery used in the geofilter's tab locationtype grid
    */
    getGeofilterLocationTypeSubQuery(user) {
        return { collectionName: 'geofilters', where: { 'userRef': user._id }, field: '_id', values: 'locationtypesRef' };
    }

    /**
    Returns the subquery used in the campaign filter's tab campaign grid
    */
    getCampaignfilterCampaignSubQuery(user) {
        return { collectionName: 'campaignfilters', where: { 'userRef': user._id }, field: '_id', values: 'campaignsRef' };
    }

    private getGeofilterFilter(userId) {
        return [
            [{ field: 'userRef', operator: { _id: 'inq' }, value: [{ _id: userId }] }]
        ];
    }

    private getCampaignfilterFilter(userId) {
        return [
            [{ field: 'userRef', operator: { _id: 'inq' }, value: [{ _id: userId }] }]
        ];
    }

}
