import styled from 'styled-components';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useRef } from 'react';
import Button from '../../../common/Button/Button';
import { useForm, useFieldArray } from 'react-hook-form';
import { PostedStore } from '../../../../types/store';
import { Category } from '../../../../types/category';
import { SNS } from '../../../../types/sns';
import { useEditStore, usePostStore } from '../../../../api/storeApi';
import Card from '../../../common/Card/Card';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function changeAllStartTime(setValue: any, time: string): void {
  week.forEach((day) => setValue(`hours.${day}.start`, time));
}

function changeAllEndTime(setValue: any, time: string): void {
  week.forEach((day) => setValue(`hours.${day}.end`, time));
}

function closedDayHandler(setValue: any, e: any, day: string) {
  e.target.closest('label')?.classList.toggle('closed');
  if (!e.target.checked) {
    setValue(`hours.${day}.start`, null);
    setValue(`hours.${day}.end`, null);
  } else {
    setValue(`hours.${day}.start`, '12:00');
    setValue(`hours.${day}.end`, '12:00');
  }
}

const defaultFormValues: PostedStore = {
  title: '',
  description: '',
  category: Category.art,
  start_date: '',
  end_date: '',
  hours: {
    mon: {
      start: null,
      end: null,
    },
    tue: {
      start: null,
      end: null,
    },
    wed: {
      start: null,
      end: null,
    },
    thu: {
      start: null,
      end: null,
    },
    fri: {
      start: null,
      end: null,
    },
    sat: {
      start: null,
      end: null,
    },
    sun: {
      start: null,
      end: null,
    },
  },
  location: '',
  postcode: {
    sido: '',
    sigungu: '',
  },
  coord: {
    coordinates: [0, 0],
    type: 'Point',
  },
  price: 0,
  sns: [],
  reservation_required: false,
  images: [],
  scraps: [],
};

interface Props {
  defaultData?: PostedStore | null;
}

const StoreForm = ({ defaultData }: Props) => {
  const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
  const locationRef = useRef<HTMLInputElement | null>(null);
  const snsUrlRef = useRef<HTMLInputElement | null>(null);
  const snsNameRef = useRef<HTMLInputElement | null>(null);
  const snsSelectRef = useRef<HTMLSelectElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const targettedStartDate = useRef<HTMLInputElement | null>(null);
  const targettedEndDate = useRef<HTMLInputElement | null>(null);

  const defaultFormData = defaultData ? defaultData : defaultFormValues;

  if (defaultData) {
    defaultData.end_date = dayjs(defaultData.end_date).format('YYYY-MM-DD');
    defaultData.start_date = dayjs(defaultData.start_date).format('YYYY-MM-DD');
  }

  const methods = useForm<PostedStore>({
    defaultValues: defaultFormData,
  });

  const { storeId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    control,
    formState: { errors },
  } = methods;

  const { ref } = register('location');

  const { append: appendImages, remove: removeImage } = useFieldArray({
    control,
    name: 'images',
  });

  const { append: appendSns, remove: removeSns } = useFieldArray({
    control,
    name: 'sns',
  });

  async function postcodeHandler(data: any) {
    if (!locationRef.current) return;
    const { sido, sigungu, roadAddress, buildingName } = data;
    const result = `${roadAddress} ${buildingName}`;
    locationRef.current.value = result;

    const coordData = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${roadAddress}`, {
      method: 'GET',
      headers: {
        Authorization: 'KakaoAK d0acc39482dfa41bbde29b60461a86ed',
      },
    });

    const { documents } = await coordData.json();

    setValue('location', result);
    setValue('postcode.sido', sido);
    setValue('postcode.sigungu', sigungu);
    setValue('coord.coordinates.0', +documents[0].x);
    setValue('coord.coordinates.1', +documents[0].y);
  }

  const { mutate: postMutate, isLoading: postLoading, isSuccess: postIsSuccess } = usePostStore();
  const { mutate: editMutate, isLoading: editLoading, isSuccess: editIsSuccess } = useEditStore();

  if (defaultData && editIsSuccess) {
    alert('스토어가 변경되었습니다.');
    location.reload();
  }

  if (!defaultData && postIsSuccess) {
    alert('스토어가 추가되었습니다.');
    location.reload();
  }

  return (
    <Card className="add-store">
      <p className="title">스토어 추가</p>
      <Container
        onSubmit={handleSubmit((data) => {
          if (data.end_date < data.start_date) {
            return setError('end_date', {
              message: '종료일은 시작일 이후여야합니다!',
            });
          }
          defaultData ? editMutate({ storeData: data, storeId: storeId as string }) : postMutate(data);
        })}
      >
        <label>
          스토어 이름
          <input
            id="title"
            type="text"
            maxLength={30}
            {...register('title', {
              required: '스토어 이름을 입력해주세요.',
            })}
          />
        </label>
        <strong>{errors?.title?.message}</strong>
        <label className="textarea-input">
          스토어 설명
          <textarea
            maxLength={400}
            {...register('description', {
              required: '스토어 설명을 입력해주세요!',
            })}
          />
        </label>
        <strong>{errors?.description?.message}</strong>
        <label>
          카테고리
          <select {...register('category')}>
            <option value={Category.art}>{Category.art}</option>
            <option value={Category.character}>{Category.character}</option>
            <option value={Category.clothes}>{Category.clothes}</option>
            <option value={Category.design}>{Category.design}</option>
            <option value={Category.drink}>{Category.drink}</option>
            <option value={Category.entertainment}>{Category.entertainment}</option>
            <option value={Category.finance}>{Category.finance}</option>
            <option value={Category.food}>{Category.food}</option>
            <option value={Category.sport}>{Category.sport}</option>
            <option value={Category.tech}>{Category.tech}</option>
            <option value={Category.other}>{Category.other}</option>
          </select>
        </label>
        <label>
          시작일
          <input
            type="date"
            {...register('start_date', {
              required: '시작일을 입력해주세요!',
            })}
          />
        </label>
        <strong>{errors?.start_date?.message}</strong>
        <label>
          종료일
          <input
            type="date"
            {...register('end_date', {
              required: '종료일을 입력해주세요!',
            })}
          />
        </label>
        <strong>{errors?.end_date?.message}</strong>
        <div className="hours">
          <p>운영시간</p>
          <label>
            <input type="time" defaultValue="00:00" ref={targettedStartDate} />
            <input type="time" defaultValue="12:00" ref={targettedEndDate} />
            <Button
              onClick={(e) => {
                e.preventDefault();
                document.querySelectorAll<HTMLInputElement>('label.closed').forEach((el) => {
                  el.classList.remove('closed');
                  const checkbox = el.querySelector<HTMLInputElement>('input[type="checkbox"]');
                  checkbox!.checked = true;
                });

                const startDate = targettedStartDate.current?.value as string;
                const endDate = targettedEndDate.current?.value as string;

                changeAllStartTime(setValue, startDate);
                changeAllEndTime(setValue, endDate);
              }}
            >
              일괄 적용
            </Button>
          </label>
          <label className={watch().hours.mon ? '' : 'closed'}>
            <input
              type="checkbox"
              defaultChecked={watch().hours.mon ? true : false}
              onChange={(e) => {
                closedDayHandler(setValue, e, 'mon');
              }}
            />
            월요일
            <input className="start-time" type="time" {...register('hours.mon.start')} />
            <input className="end-time" type="time" {...register('hours.mon.end')} />
          </label>
          <label className={watch().hours.mon ? '' : 'closed'}>
            <input
              type="checkbox"
              defaultChecked={watch().hours.mon ? true : false}
              onChange={(e) => {
                closedDayHandler(setValue, e, 'tue');
              }}
            />
            화요일
            <input className="start-time" type="time" {...register('hours.tue.start')} />
            <input className="end-time" type="time" {...register('hours.tue.end')} />
          </label>
          <label className={watch().hours.mon ? '' : 'closed'}>
            <input
              type="checkbox"
              defaultChecked={watch().hours.mon ? true : false}
              onChange={(e) => {
                closedDayHandler(setValue, e, 'wed');
              }}
            />
            수요일
            <input className="start-time" type="time" {...register('hours.wed.start')} />
            <input className="end-time" type="time" {...register('hours.wed.end')} />
          </label>
          <label className={watch().hours.mon ? '' : 'closed'}>
            <input
              type="checkbox"
              defaultChecked={watch().hours.mon ? true : false}
              onChange={(e) => {
                closedDayHandler(setValue, e, 'thu');
              }}
            />
            목요일
            <input className="start-time" type="time" {...register('hours.thu.start')} />
            <input className="end-time" type="time" {...register('hours.thu.end')} />
          </label>
          <label className={watch().hours.mon ? '' : 'closed'}>
            <input
              type="checkbox"
              defaultChecked={watch().hours.mon ? true : false}
              onChange={(e) => {
                closedDayHandler(setValue, e, 'fri');
              }}
            />
            금요일
            <input className="start-time" type="time" {...register('hours.fri.start')} />
            <input className="end-time" type="time" {...register('hours.fri.end')} />
          </label>
          <label className={watch().hours.mon ? '' : 'closed'}>
            <input
              type="checkbox"
              defaultChecked={watch().hours.mon ? true : false}
              onChange={(e) => {
                closedDayHandler(setValue, e, 'sat');
              }}
            />
            토요일
            <input className="start-time" type="time" {...register('hours.sat.start')} />
            <input className="end-time" type="time" {...register('hours.sat.end')} />
          </label>
          <label className={watch().hours.mon ? '' : 'closed'}>
            <input
              type="checkbox"
              defaultChecked={watch().hours.mon ? true : false}
              onChange={(e) => {
                closedDayHandler(setValue, e, 'sun');
              }}
            />
            일요일
            <input className="start-time" type="time" {...register('hours.sun.start')} />
            <input className="end-time" type="time" {...register('hours.sun.end')} />
          </label>
        </div>
        <label>
          입장료
          <input
            type="number"
            {...register('price', {
              valueAsNumber: true,
            })}
          />
        </label>
        <label>
          <Button
            onClick={(e) => {
              e.preventDefault();
              open({ onComplete: postcodeHandler });
            }}
          >
            주소 찾기
          </Button>
          <input
            type="text"
            disabled
            {...register('location', {
              required: '주소를 입력해주세요.',
            })}
            ref={(e) => {
              ref(e);
              locationRef.current = e;
            }}
          />
        </label>
        <strong>{errors?.location?.message}</strong>

        <label>
          SNS
          <div className="sns">
            <select ref={snsSelectRef}>
              <option value={SNS.insta}>{SNS.insta}</option>
              <option value={SNS.website}>{SNS.website}</option>
              <option value={SNS.kakao}>{SNS.kakao}</option>
            </select>
            <input type="text" ref={snsUrlRef} placeholder="url" />
            <input type="text" ref={snsNameRef} placeholder="홈페이지명" />
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (!snsUrlRef.current?.value) {
                  return setError('sns', {
                    message: 'url을 입력해주세요!',
                  });
                }
                if (!snsNameRef.current?.value) {
                  return setError('sns', {
                    message: 'sns명을 입력해주세요!',
                  });
                }
                appendSns({
                  link_title: snsNameRef.current.value,
                  link_type: snsSelectRef.current!.value,
                  link_url: snsUrlRef.current.value,
                });
                clearErrors('sns');
              }}
            >
              추가
            </Button>
          </div>
        </label>
        <div className="sns-list">
          {watch().sns &&
            watch().sns.map((item, idx) => {
              return (
                <div className="sns-item" key={idx}>
                  <p>{item.link_type}</p>
                  <p>{item.link_title}</p>
                  <p>{item.link_url}</p>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      removeSns(idx);
                    }}
                  >
                    삭제
                  </Button>
                </div>
              );
            })}
        </div>
        <strong>{errors?.sns?.message}</strong>
        <label className="imgs">
          이미지 추가하기
          <input
            type="file"
            accept="image/*"
            ref={imageRef}
            onChange={(e) => {
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files![0]);
              reader.onload = (e) => {
                appendImages(e.target!.result);
              };
            }}
          />
        </label>
        <div className="preview">
          {watch().images &&
            watch().images.map((image, idx) => {
              return (
                <figure key={idx}>
                  <img src={image}></img>
                  <span
                    className="delete"
                    onClick={() => {
                      removeImage(idx);
                    }}
                  >
                    x
                  </span>
                </figure>
              );
            })}
        </div>
        <label>
          예약 필수
          <input type="checkbox" {...register('reservation_required')} />
        </label>
        <button disabled={postLoading || editLoading} className="submit" type="submit">
          {defaultData ? '수정하기' : '추가하기'}
        </button>
      </Container>
    </Card>
  );
};

const Container = styled.form`
  display: flex;
  flex-direction: column;

  width: 600px;

  gap: 20px;

  font-size: 20px;
  font-weight: 300;

  label {
    margin-left: 10px;

    font-size: 20px;
    font-weight: 300;

    input,
    textarea {
      width: 300px;
      margin-right: 10px;

      font-family: sans-serif;

      padding: 0 10px;

      margin-top: 10px;
      margin-left: 10px;

      font-size: 20px;

      border: none;
      border-bottom: 1px solid #c2c2c2;

      transition: all 0.5s;

      &[type='time'],
      &[type='date'] {
        width: 140px;
      }

      &[type='checkbox'] {
        width: 30px;
      }

      &:focus {
        outline: none;
        border-bottom: 1px solid #b937e5;
        background-color: #f1f1f1;
      }
    }

    select {
      width: 100px;
      height: 30px;

      margin-left: 10px;
      padding-top: 3px;

      border-radius: 10px;
      border: solid 1px #c2c2c2;

      text-align: center;

      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;

      &:focus {
        border: solid 1px #b937e5;
      }
    }

    &.textarea-input {
      display: flex;
      flex-direction: column;

      textarea {
        height: 200px;
        padding: 10px;
        margin-left: 0;
      }
    }

    &.closed {
      opacity: 0.3;
      input[type='time'] {
        pointer-events: none;
        opacity: 0.4;
      }
    }
  }

  .sns {
    display: flex;
    gap: 10px;
    flex-direction: column;

    select {
      margin-top: 20px;
    }

    button {
      margin-left: 10px;
      width: 100px;
    }
  }

  strong {
    position: relative;
    margin-left: 10px;

    font-size: 14px;
    color: #ef4f4f;
  }

  .hours {
    display: flex;
    flex-direction: column;
    gap: 20px;

    margin: 20px 0;
  }

  .imgs {
    display: flex;
    flex-direction: column;

    input {
      font-size: 14px;
    }
  }

  .sns-list {
    margin-left: 20px;
    font-size: 16px;

    .sns-item {
      display: flex;
      align-items: center;
      gap: 20px;

      margin-bottom: 10px;
    }
  }

  .preview {
    display: flex;
    flex-direction: row;
    gap: 20px;

    figure {
      position: relative;
      width: 100px;
      aspect-ratio: 1/1;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .delete {
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;
        height: 20px;
        background-color: #ef4f4f;
        color: #fff;
        text-align: center;
        font-weight: 800;
        line-height: 0.8;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .submit {
    height: 40px;
    margin-top: 20px;
    border-radius: 10px;
    background-color: #652cc1;
    color: #fff;
  }
`;

export default StoreForm;
