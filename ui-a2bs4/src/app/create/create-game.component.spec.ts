import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {NgbModal, NgbModule, NgbTabsetConfig, NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {CreateGameComponent} from './create-game.component';
import {FormsModule} from '@angular/forms';
import {FeatureGroup} from '../core-games-ui/features/feature-group.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FeatureCacheService} from '../core-games-ui/features/feature-cache.service';
import {Feature} from '../core-games-ui/features/feature.model';
import {FeatureOption} from '../core-games-ui/features/feature-option.model';
import {Friend} from '../core-games-ui/friends/friend.model';
import {Invitable} from '../core-games-ui/friends/invitable.model';
import {FriendsService} from '../core-games-ui/friends/friends.service';
import {BootstrapActionsService} from '../core-games-ui-bs/actions/bootstrap-actions.service';
import {MultiSelectModule} from 'primeng/primeng';
import {InviteComponent} from '../core-games-ui-bs/invite/invite.component';

class MockFeatureService {
    public features: BehaviorSubject<FeatureGroup[]> = new BehaviorSubject<FeatureGroup[]>([]);
}

class MockFriendService {
    public friends: BehaviorSubject<Friend[]> = new BehaviorSubject<Friend[]>([]);
    public invitableFriends: BehaviorSubject<Invitable[]> = new BehaviorSubject<Invitable[]>([]);

    refreshFriends = jasmine.createSpy('rf');
}

class MockBoostrapActions {
    newGame = jasmine.createSpy('newGame');
}

let groups: FeatureGroup[] = [
    new FeatureGroup('Group1'),
    new FeatureGroup('Group2')
];
groups[0].features = [
    new Feature('feature1', 'feature 1', 'feature 1 desc'),
    new Feature('feature2', 'feature 2', 'feature 2 desc'),
];
groups[1].features = [
    new Feature('feature3', 'feature 3', 'feature 3 desc'),
];
groups[0].features[0].options = [
    new FeatureOption('option1-1', 'option 1-1', 'option 1-1 desc'),
    new FeatureOption('option1-2', 'option 1-2', 'option 1-2 desc'),
    new FeatureOption('option1-3', 'option 1-3', 'option 1-3 desc'),
];
groups[0].features[1].options = [
    new FeatureOption('option2-1', 'option 2-1', 'option 2-1 desc'),
    new FeatureOption('option2-2', 'option 2-2', 'option 2-2 desc'),
];
groups[1].features[0].options = [
    new FeatureOption('option3-1', 'option 3-1', 'option 3-1 desc'),
    new FeatureOption('option3-2', 'option 3-2', 'option 3-2 desc'),
    new FeatureOption('option3-3', 'option 3-3', 'option 3-3 desc'),
    new FeatureOption('option4-3', 'option 4-3', 'option 4-3 desc'),
];

class MockModal {
    public open = jasmine.createSpy('open');
}
describe('Component:  create game component', () => {
    let featureService: MockFeatureService;
    let friendService: MockFriendService;
    let actionService: MockBoostrapActions;
    let modalService: MockModal;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                FormsModule,
                MultiSelectModule
            ],
            declarations: [
                CreateGameComponent
            ],
            providers: [
                {provide: FeatureCacheService, useClass: MockFeatureService},
                {provide: FriendsService, useClass: MockFriendService},
                {provide: BootstrapActionsService, useClass: MockBoostrapActions},
                {provide: NgbModal, useClass: MockModal},
                NgbTabsetConfig,
                NgbTooltipConfig
            ]
        });
        TestBed.compileComponents();
        featureService = TestBed.get(FeatureCacheService);
        friendService = TestBed.get(FriendsService);
        actionService = TestBed.get(BootstrapActionsService) as MockBoostrapActions;
        modalService = TestBed.get(NgbModal);
    });

    it('initializes', () => {
        const fixture = TestBed.createComponent(CreateGameComponent);

        fixture.detectChanges();
        let empty = {};
        expect(fixture.componentInstance.choices).toEqual(empty);
        expect(fixture.componentInstance.groups).toEqual([]);
        expect(fixture.componentInstance.friends).toEqual([]);
        expect(fixture.componentInstance.disableCreate).toEqual(true);
    });

    it('subscribes to game features', () => {
        const fixture = TestBed.createComponent(CreateGameComponent);

        expect(fixture.componentInstance.disableCreate).toEqual(true);
        featureService.features.next(groups);
        fixture.detectChanges();

        expect(fixture.componentInstance.disableCreate).toEqual(false);
        expect(fixture.componentInstance.groups).toEqual(groups);
        expect(JSON.stringify(fixture.componentInstance.choices)).toEqual(JSON.stringify(
            {
                feature1: 'option1-1',
                feature2: 'option2-1',
                feature3: 'option3-1',
            }
        ));


        groups.forEach(group => {
            let tab = fixture.nativeElement.querySelector('#' + group.groupType);
            expect(tab).toBeDefined();
        });
    });

    it('subscribes to friends', () => {
        const fixture = TestBed.createComponent(CreateGameComponent);
        expect(friendService.refreshFriends).toHaveBeenCalledTimes(1);
        let newFriend: Friend[] = [new Friend('md5', 'dn1'), new Friend('md', 'dn')];
        let newInt: Invitable[] = [new Invitable('id1', '1')];
        friendService.friends.next(newFriend);
        friendService.invitableFriends.next(newInt);
        expect(fixture.componentInstance.friends).toEqual(newFriend);
    });

    describe('after initialized', () => {
        let fixture;
        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(CreateGameComponent);
            featureService.features.next(groups);
            tick();
            fixture.detectChanges();
        }));

        it('invite friends opens dialog', () => {
            fixture.nativeElement.querySelector('.invite-friends-button').click();
            expect(modalService.open).toHaveBeenCalledWith(InviteComponent);
        });
        
        it('submits a solo game', () => {
            fixture.nativeElement.querySelector('#option2-2').click();
            fixture.nativeElement.querySelector('#option1-3').click();
            fixture.detectChanges();

            expect(JSON.stringify(fixture.componentInstance.choices)).toEqual(JSON.stringify(
                {
                    feature1: 'option1-3',
                    feature2: 'option2-2',
                    feature3: 'option3-1',
                }
            ));

            fixture.nativeElement.querySelector('.create-game-button').click();
            expect(actionService.newGame).toHaveBeenCalledWith({
                players: [],
                features: ['option1-3', 'option2-2', 'option3-1']
            });
        });

        it('submits a multi-player game', () => {
            //  Not testing clicking via prime-ng component - assume it works
            fixture.nativeElement.querySelector('#option2-2').click();
            fixture.nativeElement.querySelector('#option1-3').click();
            fixture.detectChanges();
            fixture.componentInstance.chosenFriends = [new Friend('md51', 'dn1'), new Friend('md52', 'dn2')];


            expect(JSON.stringify(fixture.componentInstance.choices)).toEqual(JSON.stringify(
                {
                    feature1: 'option1-3',
                    feature2: 'option2-2',
                    feature3: 'option3-1',
                }
            ));

            fixture.nativeElement.querySelector('.create-game-button').click();
            expect(actionService.newGame).toHaveBeenCalledWith({
                players: ['md51', 'md52'],
                features: ['option1-3', 'option2-2', 'option3-1']
            });
        });
    });
});
