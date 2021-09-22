export default ({ store, redirect }) => {
    if(store.$storage.getUniversal('auth.user').role_name === 'administrator') {
        return redirect('/teams');
    } else {
        return redirect('/');
    }
}