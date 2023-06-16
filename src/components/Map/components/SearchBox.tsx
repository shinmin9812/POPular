import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Coord, Map } from '../containers/Map';

const Container = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  width: fit-content;
  height: fit-content;
  z-index: 500;

  transform: translateX(-50%);

  input {
    width: 300px;
    height: 30px;
    border: none;
    border-radius: 15px;

    text-align: center;

    box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.39);
    -webkit-box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.39);
    -moz-box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.39);
  }

  ul,
  .blank {
    position: absolute;
    top: 40px;

    display: flex;
    flex-direction: column;

    width: 300px;
    gap: 10px;
    padding: 10px;
    background-color: #fff;

    border-radius: 10px;

    box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.39);
    -webkit-box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.39);
    -moz-box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.39);
  }

  .result-item {
    z-index: 500;
    background-color: #fff;

    font-weight: 500;
    font-size: 14px;
  }

  .result-item:hover {
    cursor: pointer;
  }
`;

interface Result {
  address_name: string;
  x: string;
  y: string;
}

interface Props {
  setCenter(coord: Coord): any;
  map: Map;
}

const SearchBox = ({ map, setCenter }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [focusInput, setFocusInput] = useState<boolean>(false);

  const changeHanlder = () => {
    if (!searchRef.current?.value) return;
    searchAddress(searchRef.current?.value);
  };

  async function searchAddress(query: string) {
    const apiKey = 'd0acc39482dfa41bbde29b60461a86ed'; // 카카오 개발자 웹사이트에서 발급한 API 키를 입력합니다.

    const url = 'https://dapi.kakao.com/v2/local/search/address.json';
    const headers = { Authorization: `KakaoAK ${apiKey}` };

    const params = new URLSearchParams({
      query: query,
      type: 'address',
      page: '1',
      size: '10',
      sort: 'accuracy',
    });

    try {
      const response = await fetch(`${url}?${params.toString()}`, {
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('API 호출 중 오류가 발생했습니다.');
      }

      const result = await response.json();
      setResults(result.documents);
    } catch (error) {
      console.error('API 호출 중 오류가 발생했습니다:', error);
    }
  }

  return (
    <Container>
      <input
        type="text"
        placeholder="지역명을 입력해주세요"
        onChange={changeHanlder}
        onFocus={() => {
          setFocusInput(true);
        }}
        ref={searchRef}
      />
      {focusInput && results.length > 0 && (
        <ul>
          {results.map((result) => {
            return (
              <li key={result.address_name}>
                <div
                  onClick={() => {
                    setCenter({ lat: +result.y, lng: +result.x });
                    const position = new window.kakao.maps.LatLng(+result.y, result.x);
                    searchRef.current!.value = result.address_name;
                    map.setCenter(position);
                    setFocusInput(false);
                  }}
                  className="result-item"
                >
                  {result.address_name}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {focusInput && results.length === 0 && <div className="blank">검색 결과가 없습니다.</div>}
    </Container>
  );
};

export default SearchBox;
