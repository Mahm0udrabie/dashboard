export default ({ store, redirect }) => {
    if(store.$storage.getUniversal('auth.user').role_name !== 'superadministrator') {
        return redirect('/');
    }
}