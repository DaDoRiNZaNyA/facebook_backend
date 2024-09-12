"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const design_system_1 = require("@adminjs/design-system");
const UserPostsList = (props) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [posts, setPosts] = (0, react_1.useState)([]);
    const [total, setTotal] = (0, react_1.useState)(1);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [postsPage, setPostsPage] = (0, react_1.useState)(1);
    console.log(props.record.params.id);
    (0, react_1.useEffect)(() => {
        const fetchPosts = () => __awaiter(void 0, void 0, void 0, function* () {
            setLoading(true);
            try {
                const response = yield axios_1.default.get(`/admin/api/resources/Post/actions/list/?page=${postsPage}&filters.user=${props.record.params.id}`);
                setPosts(response.data.records);
                setTotal(response.data.meta.total);
            }
            catch (error) {
                setError('Error fetching posts.');
                console.error('Error fetching posts:', error);
            }
            finally {
                setLoading(false);
            }
        });
        fetchPosts();
    }, [props.record.params.id, postsPage]);
    if (loading)
        return <p>Loading...</p>;
    if (error)
        return <p>{error}</p>;
    return (<div style={{ paddingTop: 20 }}>
      <design_system_1.Table>
        <design_system_1.TableCaption>Список постов</design_system_1.TableCaption>
        <design_system_1.TableHead>
          <design_system_1.TableRow>
            <design_system_1.TableCell>Post ID</design_system_1.TableCell>
            <design_system_1.TableCell>Text</design_system_1.TableCell>
            <design_system_1.TableCell>Media</design_system_1.TableCell>
            <design_system_1.TableCell>Created At</design_system_1.TableCell>
          </design_system_1.TableRow>
        </design_system_1.TableHead>
        <design_system_1.TableBody>
          {posts.map((post) => (<design_system_1.TableRow key={post.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/resources/Post/records/${post.id}/show`)}>
              <design_system_1.TableCell>{post.params.id}</design_system_1.TableCell>
              <design_system_1.TableCell>{post.params.text}</design_system_1.TableCell>
              <design_system_1.TableCell>{post.params.media}</design_system_1.TableCell>
              <design_system_1.TableCell>
                {new Date(post.params.createdAt).toLocaleString()}
              </design_system_1.TableCell>
            </design_system_1.TableRow>))}
        </design_system_1.TableBody>
      </design_system_1.Table>
      <design_system_1.Text py="xl" textAlign="center">
        <design_system_1.Pagination page={postsPage} onChange={(value) => setPostsPage(value)} total={total} perPage={10}/>
      </design_system_1.Text>
    </div>);
};
exports.default = UserPostsList;
//# sourceMappingURL=UserPostsList.jsx.map