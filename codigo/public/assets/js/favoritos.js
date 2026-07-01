// Módulo de Favoritos
// Persiste favoritos por usuário em localStorage com chave "favoritos_<usuarioId>"

function _getUsuario() {
    let json = sessionStorage.getItem('usuarioCorrente');
    return json ? JSON.parse(json) : null;
}

function _getChave(usuario) {
    return 'favoritos_' + usuario.id;
}

function _getFavoritosLocal() {
    let usuario = _getUsuario();
    if (!usuario) return [];
    let dados = localStorage.getItem(_getChave(usuario));
    return dados ? JSON.parse(dados) : [];
}

function _salvarFavoritosLocal(ids) {
    let usuario = _getUsuario();
    if (!usuario) return;
    localStorage.setItem(_getChave(usuario), JSON.stringify(ids));
}

function toggleFavorito(artigoId, btnEl) {
    let usuario = _getUsuario();
    if (!usuario) {
        alert('Você precisa estar logado para favoritar artigos.');
        window.location.href = '/modulos/login/login.html';
        return;
    }
    let ids = _getFavoritosLocal();
    let idx = ids.indexOf(artigoId);
    if (idx >= 0) {
        ids.splice(idx, 1);
        btnEl.classList.remove('favoritado');
        btnEl.title = 'Adicionar aos favoritos';
    } else {
        ids.push(artigoId);
        btnEl.classList.add('favoritado');
        btnEl.title = 'Remover dos favoritos';
    }
    _salvarFavoritosLocal(ids);
}

function marcarBotoesFavoritos() {
    let ids = _getFavoritosLocal();
    document.querySelectorAll('.btn-favorito').forEach(btn => {
        let id = parseInt(btn.dataset.id);
        if (ids.includes(id)) {
            btn.classList.add('favoritado');
            btn.title = 'Remover dos favoritos';
        } else {
            btn.classList.remove('favoritado');
            btn.title = 'Adicionar aos favoritos';
        }
    });
}

function getFavoritosIds() {
    return _getFavoritosLocal();
}
