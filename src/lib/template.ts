import { config } from './Config';

export const header = ` 
<div class="bar"></div>
`;

export const headerMask = `

        <div data-v-73dd4d21="" class="notes-head">
          <i
            data-v-73dd4d21=""
            class="fa fa-trash xui-tooltip item"
            aria-describedby="xui-tooltip-41462"
            tabindex="0"></i>
          <div data-v-73dd4d21="" class="note-drag"></div>
          <i
            data-v-73dd4d21=""
            class="fa fa-plus xui-tooltip item"
            aria-describedby="xui-tooltip-43874"
            tabindex="0"></i>
          <i
            data-v-73dd4d21=""
            class="far fa-eye-slash xui-tooltip item"
            aria-describedby="xui-tooltip-33637"
            tabindex="0"></i>
          <div data-v-73dd4d21="" class="delete-note" style="display: none">
            <span data-v-73dd4d21="" class="delete-note-title">确定要删除吗？</span>
            <div data-v-73dd4d21="" class="delete-button">
              <button data-v-73dd4d21="" type="button" class="xui-button xui-button--default">
                <!----><!----><span>取消</span>
              </button>
              <button data-v-73dd4d21="" type="button" class="xui-button xui-button--default">
                <!----><!----><span>删除</span>
              </button>
            </div>
            <div data-v-73dd4d21="" class="popper__arrow"></div>
          </div>
        </div>

`;

export const resizeHandle = `<div class="resizeHandle"></div>`;
const configHTML = `
          <div class="theme item">
            <span class="tag">Theme: </span>
            <span class="capsule"><span class="left capactive">Light</span><span class="right">Dark</span></span>
          </div>
          <div class="tsize item">
            <span class="tag">Title Size: </span>
            <select id="titleSize" name="titleSize">
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>
          </div>
          <div class="csize item">
            <span class="tag">Content Size: </span>
            <select id="contentSize" name="titleSize">
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>
          </div>

          <div class="hidenMode item">
            <span class="tag">Hiden Mode: </span>
            <span class="capsule"><span class="left capactive">hiden</span><span class="right">replace</span></span>
          </div>

          <div class="mask item">
            <span class="tag">Mask: </span
            ><span class="switch"><input type="checkbox" id="maskSwitch" /><label for="maskSwitch">Toggle</label></span>
          </div>

          <div class="hotKey item">
            <span class="tag">Hot Key: </span>
            <div class="kItem">
              <span class="name">Hiden</span>
              <span class="key">AltLeft+Space</span>
            </div>
            <div class="kItem">
              <span class="name">Search</span>
              <span class="key">AltLeft+KeyF</span>
            </div>
            <div class="kItem">
              <span class="name">Next Page</span>
              <span class="key">ArrowRight</span>
            </div>
            <div class="kItem">
              <span class="name">Previous Page</span>
              <span class="key">ArrowLeft</span>
            </div>
          </div>

          <div class="replaceText item">
            <span class="tag">Replace Text: </span>
          <div class="textarea">
            <textarea>${config.config.replaceText}</textarea>
          </div>
        </div>

          <div class="msg item">
            <div class="ms">
              <div><span>width: </span> <span>240</span> <span>height: </span> <span>240</span></div>
              <div><span>x: </span> <span>240</span> <span>y: </span> <span>240</span></div>
            </div>
          </div>
`;

export const wnhView = `<div class="wnhView">
<div class="novel"></div>
<div class="replace">${config.config.replaceText}</div>
<div class="config">${configHTML}</div>

<div class="tools">
  <div class="search">
    <input type="text" id="searchInput" placeholder="键入章节名或序号" />
  </div>
  <div class="item">
    <div class="upload">u</div>
    <input type="file" id="fileInput" accept=".txt" />
  </div>

  <div class="item">
    <div class="settings">c</div>
  </div>

  <div class="control">
    <div class="pre item">&gt;</div>
    <div class="next item">&lt;</div>
  </div>
</div>
</div>`;

export default { header, resizeHandle, wnhView, headerMask };
