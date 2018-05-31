declare namespace AngularRouter {

    export interface CanActivate {
        canActivate: (route: any, state: any) => any;
    }

    export interface CanDeactivate<T> {
        canDeactivate: (component: T, currentRoute: any, currentState: any, nextState?: any) => any;
    }

    export interface Router {
        navigate: (args) => any;
    }

    export interface Resolve<T> {
        
    }

    export interface ActivatedRouteSnapshot {
        data: any;
    }

    export interface RouterStateSnapshot { }

    export interface NavigationEnd { }

    export interface ActivatedRoute { }

}