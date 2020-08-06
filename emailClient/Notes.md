## Class Based Custom Sync Validator
1. Create a new class to implement your custom Validator
2. Have the class implement the 'Validator' interface
3. Add a 'validate' method to the class, which will be called with a FormGroup or FormControl
4. Validator method should return 'null' if everything is ok, or an object if something is wrong.

## Class Based Custom Async Validator
1. Create a new class to implement your custom Validator
2. Have the class implement the 'AsyncValidator' interface
3. Add a 'validate' method to the class, which will be called with a FormGroup or FormControl
4. Validator method should return an Observable or Promise that will emit 'null' if everything is ok, or an object if something is wrong.
// of() is a shortcut to create Observable

## Requirements for  SignedIn Observable
1. We must be able to get it to emit a new value 'from the outside'
2. We must be able to give it a default,or starting value.
3. New subscribers must be given the value from it immediately after subscribing.

//By default , Angular ignores the http cookies until we use 
 withcredentials:true property explicitly.
Hence use Http Interceptor

## Guard

1. canActivate: User can visit this route.
2. canActivateChild: User can visit this child route.
3. canLoad : User can load this lazily loaded module and access the routes inside of it.

**Execution Flow:**
1. User navigates to '/'
2. App component calls 'checkLogin' in AuthService.
3. Make request to see of we are logged in.
4. *User clicks on link to '/inbox'*
5. ~~AuthGuard looks at signedin$, only gets default value of 'false'~~
5. *AuthGuard calls 'checkAuth*
6. *Authguard returns value from signedin$*
7. AuthService emits true or false from signedin$ observable.

### canLoad:

- If we return an Observable, canLoad will watch it until it is marked as complete. Then it will take the last value that is emitted and decide whether the user can navigate to this route.

``` 
    canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable ((subscriber) => {
        subscriber.next(true);
        subscriber.complete;

    })
  } 
```
  
### AuthGuard Issues:
1. The signedin$ behavior subject never gets marked as complete.
- Use some RxJS trickery to mark the behavior subject as complete.

2. If the guard runs before our 'checkAuth()' is done, we will provide the default false value, marking the user as not authenticated.
-  Change the default value of the behavior subject to null (We dont know whether the user is signed in yet)

```
const {Observable} = Rx;
const {skipWhile, take} = RxOperators;

new Observable((subscriber) => {
  subscriber.next(null);
  setTimeout(() => {
    subscriber.next(true);
  },1000);
}).pipe(
    skipWhile((value)) => {
        return value === null;
    }),
    take(1)
);

```

3. If we move the checkAuth call to the guard, we risk not running the function at all if a user only loads another route.
- leave the checkAuth call in the App component.


### Information from the current route:

1. **Observable**: Emits values whenever some specific part of the URL changes

2. **Snapshot**: Simple description of what the URL is right now.